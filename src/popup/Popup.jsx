import Logo from "../assets/Logo.svg";
import Clock from "../ui/Clock";
import ToggleSwitch from "../ui/ToggleSwitch";
import GoalProgress from "../ui/GoalProgress";
import AmbiencePlayer from "../ui/AmbiencePlayer";
import { Shield, Sparkles, MoveRight } from "lucide-react";
import { useSound } from "react-sounds";
import { easeIn, easeInOut, motion } from "motion/react";

function Popup() {
  return (
    <div className="w-md min-h-150 max-h-200  bg-[#F9FAF8] rounded-2xl border overflow-scroll">
      <div className="bg-[#F9FAF9]  shadow-1 py-4 px-8 flex justify-between items-center">
        <img
          src={Logo}
          loading="lazy"
          className="w-20 h-20 rounded-full bg-tertiary  "
          alt="Logo"
        />
        <h1 className="font-body text-3xl text-primary font-semibold ">
          ZenMind
        </h1>
      </div>
      <Clock />
      <div className="flex justify-between py-4 px-4">
        <div className="bg-[#F3F4F2] w-50 flex flex-col  gap-2.5 border-transparent rounded-2xl p-3  ">
          <Shield className="bg-tertiary text-primary rounded-full p-3 size-15" />
          <h3 className="font-body text-neutral-800 font-semibold tracking-tight">
            Gentel Guard
          </h3>
          <p className="font-body font-normal text-neutral-600 text-sm tracking-tight">
            Website blocking active
          </p>
          <ToggleSwitch />
        </div>
        <div className="bg-[#F3F4F2] w-50 border-transparent rounded-2xl p-3 flex flex-col justify-between  ">
          <div className="justify-between flex ">
            <h3 className="text-md font-headlinefont-semibold text-neutral-500">
              Today
            </h3>
            <Sparkles className="size-6 text-secondary " />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-4xl text-primary font-headline font-semibold">
              4.2{" "}
              <span className="text-lg text-primary/50 font-normal">HRS</span>
            </h3>
            <GoalProgress />
          </div>
        </div>
      </div>
      <div className="flex flex-col py-2 px-4 justify-between  gap-2 ">
        <label
          for="blockerMode"
          className="text-xl font-headline text-neutral-800 "
        >
          Choose Blocker Mode
        </label>
        <select
          className="bg-tertiary  w-full focus:outline-none rounded-xl px-2 py-4 text-xl "
          name="blockerMode"
          id="blockerMode"
        >
          <option value="Quick Focus">Quick Focus</option>
          <option value="Deep Focus">Deep Focus</option>
          <option value="Strict Mode">Strict Mode</option>
        </select>
        <motion.button
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: easeInOut }}
          className="px-2 py-4 text-xl rounded-lg border border-secondary bg-secondary text-white shadow-sm hover:bg-primary focus:outline-none"
        >
          Start Mode
        </motion.button>
      </div>

      <div className="flex py-2 px-4 justify-between items-center gap-2 ">
        <AmbiencePlayer />
      </div>
      <div className="flex py-2 px-4 justify-between items-center gap-2 ">
        <motion.button
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3, ease: easeInOut }}
        className=" flex items-center justify-center gap-2  px-2 py-4 text-lg w-full rounded-full border  text-white shadow-sm bg-primary focus:outline-none">
          View Analytics {" "}
        </motion.button>
        <motion.button
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3, ease: easeInOut }}
        className=" flex items-center justify-center gap-2  px-2 py-4 text-lg w-full rounded-full border  text-white shadow-sm bg-primary focus:outline-none">
          View Blocker Settings {" "}
        </motion.button>
      </div>
    </div>
  );
}

export default Popup;
