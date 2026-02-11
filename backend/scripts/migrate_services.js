const mongoose = require('mongoose');

const srcUri = process.env.SOURCE_URI || process.argv[2];
const dstUri = process.env.TARGET_URI || process.argv[3];

if (!srcUri || !dstUri) {
  console.error('\nUsage: \n  SOURCE_URI="<source connection string>" TARGET_URI="<target connection string>" node migrate_services.js\nOR\n  node migrate_services.js "<source>" "<target>"\n');
  process.exit(1);
}

async function migrate() {
  console.log('Connecting to source:', srcUri.split('@')[1] || srcUri);
  console.log('Connecting to target:', dstUri.split('@')[1] || dstUri);

  const srcConn = await mongoose.createConnection(srcUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const dstConn = await mongoose.createConnection(dstUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    const srcColl = srcConn.collection('services');
    const dstColl = dstConn.collection('services');

    const docs = await srcColl.find({}).toArray();
    console.log('Found', docs.length, 'documents in source services collection');

    if (docs.length === 0) {
      console.log('Nothing to migrate. Exiting.');
      return;
    }

    // Prepare bulk upsert operations to avoid duplicates
    const ops = docs.map(doc => ({
      replaceOne: {
        filter: { _id: doc._id },
        replacement: doc,
        upsert: true
      }
    }));

    const result = await dstColl.bulkWrite(ops, { ordered: false });

    console.log('Migration result:', {
      insertedCount: result.insertedCount,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      upsertedCount: result.upsertedCount
    });
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await srcConn.close();
    await dstConn.close();
  }
}

migrate().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1); });
