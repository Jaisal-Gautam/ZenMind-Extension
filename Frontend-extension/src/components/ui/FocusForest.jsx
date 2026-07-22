function FocusForest({dashboardData}) {

  return (
    <>
    <div className="relative ">
      <h2 className="text-2xl font-mono text-neutral-700 mb-6">
        Your Focus Forest
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex p-4 shadow-sm rounded-r-xl  bg-neutral-100 border border-gray-200  flex-col gap-2">
            <span className="text-4xl font-medium font-sans text-neutral-800">
            {dashboardData.lvl}
          </span>
          <span className="text-md tracking-tight text-neutral-600 ">
            {" "}
            Tree Lvl
          </span>
          
        </div>
        <div className="flex p-4 shadow-sm rounded-r-xl  bg-neutral-100 border border-gray-200  flex-col gap-2">
          <span className="text-4xl font-medium font-sans text-neutral-800">
          {dashboardData.stage}
          </span>
           <span className="text-md tracking-tight text-neutral-600 ">
            {" "}
            Current Stage
          </span>
        </div>
        <div className="flex p-4 shadow-sm rounded-r-xl  bg-neutral-100 border border-gray-200  flex-col gap-2">
          <span className="text-3xl font-medium font-sans text-neutral-800">
            {Math.floor(dashboardData.totalFocusTime/60)} min
          </span>
          <span className="text-md tracking-tight text-neutral-600 ">
            {" "}
            Total Focus Time
          </span>
        </div>
        <div className="flex p-4 shadow-sm rounded-r-xl  bg-neutral-100 border border-gray-200  flex-col gap-2">
          <span className="flex items-center text-3xl  gap-2 font-medium font-sans ">
            {dashboardData.xp}
          </span>
          <span className="text-md  tracking-tight text-neutral-600 ">
            {" "}
            Total XP
          </span>
        </div>
      </div>
      <span className="absolute right-1 -bottom-8 text-sm text-neutral-300 "> 1 min = 5 XP</span>
    </div>
    </>
  )
}

export default FocusForest