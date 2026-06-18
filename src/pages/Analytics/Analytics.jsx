import { FocusChart } from "@/ui/FocusChart";
import Tree_1 from "../../assets/Tree-1.png"
import { Timer, ScanEye, Flame, Shield, Lightbulb } from "lucide-react";
import { motion } from "motion/react";

function Analytics() {
  const mostResisted = [
    {
      id: 1,
      name: "Youtube",
      times: 14,
    },
    {
      id: 2,
      name: "Reddit",
      times: 7,
    },
    {
      id: 3,
      name: "Instagram",
      times: 4,
    },
  ];
  return (
    <div className="p-4 w-full flex flex-col items-center justify-center">
      <h2 className="text-4xl mt-5 font-body font-semibold text-primary tracking-tight">
        This Week's Analytics
      </h2>

      <div className="flex items-center justify-center mx-10 gap-8 mt-10">
        <div className="bg-white w-xs  shadow-1 rounded-lg p-8 flex gap-4 flex-col">
          <div className="flex justify-between">
            <Timer className="text-secondary font-bold" />
            <span className="bg-secondary/80 rounded-full px-4 py-1 text-neutral-100 ">
              +12%
            </span>
          </div>
          <h4 className="text-xl font-body text-neutral-500">Focus Time</h4>
          <h4 className="text-4xl font-semibold text-neutral-700">42h 18m</h4>
        </div>
        <div className="bg-white w-xs shadow-1 rounded-lg p-8 flex gap-4 flex-col">
          <div className="flex justify-between">
            <ScanEye className="text-secondary font-bold" />
            <span className="bg-secondary/80 rounded-full px-4 py-1 text-neutral-100 ">
              +8%
            </span>
          </div>
          <h4 className="text-xl font-body text-neutral-500">Focus Sessions</h4>
          <h4 className="text-4xl font-semibold text-neutral-700">96</h4>
        </div>
        <div className="bg-white w-xs  shadow-1 rounded-lg p-8 flex gap-4 flex-col">
          <div className="flex justify-between">
            <Flame className="text-secondary font-bold" />
            <span className=" bg-secondary/80 rounded-full px-4 py-1 text-neutral-100 ">
              +15%
            </span>
          </div>
          <h4 className="text-xl font-body text-neutral-500">Focus Streak</h4>
          <h4 className="text-4xl font-semibold text-neutral-700">21 days</h4>
        </div>
        <div className="bg-white w-xs  shadow-1 rounded-lg p-8 flex gap-4 flex-col">
          <div className="flex justify-between">
            <Shield className="  text-secondary font-bold" />
            <span className=" bg-red-400 rounded-full px-4 py-1 text-neutral-100 ">
              -5%
            </span>
          </div>
          <h4 className="text-xl font-body text-neutral-500">
            Distraction Avoided
          </h4>
          <h4 className="text-4xl font-semibold text-neutral-700">327</h4>
        </div>
      </div>
      <div className="flex items-center justify-between w-full p-8 gap-8 mt-10">
        <div className="bg-white w-md  h-100  shadow-1 rounded-lg p-8 flex gap-4 flex-col">
          <h2 className="text-4xl font-headline">Most Resisted</h2>
          {mostResisted.map((item) => (
            <div
              className="w-full bg-neutral-200 rounded-lg text-neutral-700 p-2 flex justify-between"
              key={item.id}
            >
              <span>{item.name}</span>
              <span>{item.times} times</span>
            </div>
          ))}
          <div className="bg-tertiary mt-8 gap-4 border-secondary/25 border p-4 rounded-xl flex text-lg  ">
            <Lightbulb className="size-8 text-green-900" />
            Most distractions occurred between 2 PM and 4 PM.
          </div>
        </div>
        <div className="bg-white flex-1 h-100 p-8 shadow-1 rounded-lg ">
          <h2 className="text-4xl  font-headline">When You focus Best</h2>
          <p className="text-lg text-neutral-600 mt-2 font-headline ">
            Discovering your Natural Rhythm
          </p>
          <FocusChart />
        </div>
      </div>
      <div className="flex items-center justify-between w-full p-8  gap-8">
        <div className="flex-1 rounded-xl shadow-1 p-8  bg-white ">
          <h2 className="text-3xl  font-headline">Your Focus Forest</h2>
          <p className="text-lg text-neutral-600 mt-2 font-headline ">
            A living ecosystem nurtured by your deep work.
          </p>
          <div className="flex flex-wrap gap-6 mt-5">
            <div className="bg-tertiary border-l-2 border-l-secondary p-4  w-2xs ">
              <h4 className="text-md font-body">Branches Grown</h4>
              <p className="text-4xl text-primary font-body font-semibold">0</p>
            </div>
            <div className="bg-tertiary border-l-2 border-l-secondary p-4  w-2xs ">
              <h4 className="text-md font-body">Tree Growth Level</h4>
              <p className="text-4xl text-primary font-body font-semibold">Lvl 1</p>
            </div>
            <div className="bg-tertiary border-l-2 border-l-secondary p-4  w-2xs ">
              <h4 className="text-md font-body">Deep Work Sessions</h4>
              <p className="text-4xl text-primary font-body font-semibold">0</p>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-xl shadow-1 p-8  bg-white ">
          <h2 className="text-3xl  font-headline">
            Consistency Over Intensity
          </h2>
          <p className="text-lg text-neutral-600 mt-2 font-headline ">
            Small steps build mountains over time.
          </p>
          <div className="flex flex-wrap gap-6 mt-5">
            <div className="bg-neutral border-l-2 border-l-secondary p-4  w-2xs ">
              <h4 className="text-md font-body">Current Streak</h4>
              <p className="text-4xl text-primary font-body font-semibold">21 Days</p>
            </div>
            <div className="bg-neutral border-l-2 border-l-secondary p-4  w-2xs ">
              <h4 className="text-md font-body">Longest Streak</h4>
              <p className="text-4xl text-primary font-body font-semibold">41 Days</p>
            </div>
            <div className="bg-neutral border-l-2 border-l-secondary p-4  w-2xs ">
              <h4 className="text-md font-body">Completion Rate</h4>
              <p className="text-4xl text-primary font-body font-semibold">92%</p>
            </div>
            <div className="bg-neutral border-l-2 border-l-secondary p-4  w-2xs ">
              <h4 className="text-md font-body">Avg Daily</h4>
              <p className="text-4xl text-primary font-body font-semibold">3h 24m</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col bg-white shadow-1 rounded-xl justify-center w-[calc(100%-70px)] mt-10 p-4">
        <motion.img
          src={Tree_1}
          alt="Tree Level 1"
          className="size-60"
          animate={{ y: [0, -5, 0, 5, 0] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        />
        <h4 className="font-headline text-xl  text-primary font-light">Tree Level 1</h4>
      </div>

    </div>
  );
}

export default Analytics;
