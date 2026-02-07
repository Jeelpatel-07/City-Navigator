// src/pages/TestScale.jsx
const TestScale = () => {
  return (
    <div className="min-h-screen">
      {/* Red - Should be full width */}
      <div className="bg-red-500 p-8 text-white w-full">
        <h1 className="text-3xl font-bold text-center">RED: Full Width Test</h1>
        <p className="text-center mt-2">This should go edge to edge</p>
      </div>
      
      {/* Blue - Container width */}
      <div className="container mx-auto mt-8">
        <div className="bg-blue-500 p-8 text-white rounded-xl">
          <h2 className="text-2xl font-bold text-center">BLUE: Container Test</h2>
          <p className="text-center mt-2">This should have side margins on desktop</p>
        </div>
        
        {/* Grid test */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-green-500 p-6 text-white rounded-lg">
            <h3 className="text-xl font-bold">Column 1</h3>
            <p>Should fill grid properly</p>
          </div>
          <div className="bg-yellow-500 p-6 text-white rounded-lg">
            <h3 className="text-xl font-bold">Column 2</h3>
            <p>Should fill grid properly</p>
          </div>
          <div className="bg-purple-500 p-6 text-white rounded-lg">
            <h3 className="text-xl font-bold">Column 3</h3>
            <p>Should fill grid properly</p>
          </div>
        </div>
      </div>
      
      {/* Full width section */}
      <div className="w-full bg-gray-800 text-white p-8 mt-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center">Full Width with Container</h2>
          <p className="text-center mt-2">Background full width, content in container</p>
        </div>
      </div>
    </div>
  )
}

export default TestScale