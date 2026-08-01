function FocusForest({ dashboardData }) {

  return (
    <>
      <div className="relative ">
        <h2 className="text-2xl font-mono text-text mb-6">
          Your Focus Forest
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex p-4 shadow-sm rounded-r-xl bg-surface-hover hover:border-border-strong transition-colors duration-150 ease-in dark:bg-surface border border-border-default  flex-col gap-2">
            <span className="text-4xl font-medium font-sans text-text">
              {dashboardData.lvl}
            </span>
            <span className="text-md tracking-tight text-text-soft ">
              {" "}
              Tree Lvl
            </span>

          </div>
          <div className="flex p-4 shadow-sm rounded-r-xl bg-surface-hover hover:border-border-strong transition-colors duration-150 ease-in dark:bg-surface border border-border-default  flex-col gap-2">
            <span className="text-4xl font-medium font-sans text-text">
              {dashboardData.stage}
            </span>
            <span className="text-md tracking-tight text-text-soft ">
              {" "}
              Current Stage
            </span>
          </div>
          <div className="flex p-4 shadow-sm rounded-r-xl bg-surface-hover hover:border-border-strong transition-colors duration-150 ease-in dark:bg-surface border border-border-default  flex-col gap-2">
            <span className="text-3xl font-medium font-sans text-text">
              {Math.floor(dashboardData.totalFocusTime / 60)} m
            </span>
            <span className="text-md tracking-tight text-text-soft ">
              {" "}
              Total Focus Time
            </span>
          </div>
          <div className="flex p-4 shadow-sm rounded-r-xl bg-surface-hover hover:border-border-strong transition-colors duration-150 ease-in dark:bg-surface border border-border-default  flex-col gap-2">
            <span className="flex items-center gap-2 text-3xl font-medium font-sans text-brand">
              {dashboardData.xp}
            </span>
            <span className="text-md  tracking-tight text-text-soft ">
              {" "}
              Total XP
            </span>
          </div>
        </div>
        <span className="absolute right-1 -bottom-8 text-sm text-text-disabled "> 1 min = 5 XP</span>
      </div>
    </>
  )
}

export default FocusForest