import Seed from "@/assets/Sanctuary/seed.png";
import Sprout from "@/assets/Sanctuary/sprout.png";
import Sapling from "@/assets/Sanctuary/sapling.png";
import YoungPine from "@/assets/Sanctuary/young_pine.png";
import HealthyPine from "@/assets/Sanctuary/healthy_pine.png";
import FlourishingPine from "@/assets/Sanctuary/flourishing_pine.png";
import AncientPine from "@/assets/Sanctuary/ancient_pine.png";
import ForestGrove from "@/assets/Sanctuary/forest_grove.png";
import BloomingForest from "@/assets/Sanctuary/blooming_forest.png";
import PeacefulForest from "@/assets/Sanctuary/peaceful_forest.png";
import ForestSanctuary from "@/assets/Sanctuary/forest_sanctuary.png";
import LivingForest from "@/assets/Sanctuary/living_forest.png";
import EvergreenHaven from "@/assets/Sanctuary/evergreen_haven.png";
import NatureRefuge from "@/assets/Sanctuary/nature_refuge.png";
import SereneValley from "@/assets/Sanctuary/serene_valley.png";
import MountainRetreat from "@/assets/Sanctuary/mountain_retreat.png";
import HighlandSanctuary from "@/assets/Sanctuary/highland_sanctuary.png";
import AncientWilderness from "@/assets/Sanctuary/ancient_wilderness.png";
import LegendaryForest from "@/assets/Sanctuary/legendary_forest.png";
import SerenSanctuary from "@/assets/Sanctuary/seren_sanctuary.png";
export const LEVELS = [
  {
    level: 1,
    XP: 0,
    stage: "Seed",
    desc: "Every great forest begins with a single seed. Your journey starts here.",
    nextUnlock: "Sprout",
    path: Seed,
  },
  {
    level: 2,
    XP: 100,
    stage: "Sprout",
    desc: "New life breaks through the soil. Your focus is beginning to take root.",
    nextUnlock: "Wild Grass",
    path:Sprout,
  },
  {
    level: 3,
    XP: 250,
    stage: "Sapling",
    desc: "Small but resilient, your sanctuary grows stronger with every session.",
    nextUnlock: "Wild Flowers",
    path: Sapling,
  },
  {
    level: 4,
    XP: 450,
    stage: "Young Pine",
    desc: "Your tree reaches toward the sky, standing taller with each moment of focus.",
    nextUnlock: "Stone Path",
    path: YoungPine,
  },
  {
    level: 5,
    XP: 700,
    stage: "Healthy Pine",
    desc: "A thriving pine now anchors your sanctuary, a reflection of your consistency.",
    nextUnlock: "Bird Nest",
    path: HealthyPine,
  },
  {
    level: 6,
    XP: 1000,
    stage: "Flourishing Pine",
    desc: "The forest feels alive. Every deep work session brings renewed vitality.",
    nextUnlock: "Wild Bushes",
    path: FlourishingPine,
  },
  {
    level: 7,
    XP: 1400,
    stage: "Ancient Pine",
    desc: "Years of quiet strength are taking shape. Your focus has become a habit.",
    nextUnlock: "Small River",
    path: AncientPine,
  },
  {
    level: 8,
    XP: 1900,
    stage: "Forest Grove",
    desc: "More trees join your sanctuary, transforming it into a peaceful grove.",
    nextUnlock: "Bridge",
    path: ForestGrove,
  },
  {
    level: 9,
    XP: 2500,
    stage: "Blooming Forest",
    desc: "Flowers bloom across the landscape, celebrating your growing discipline.",
    nextUnlock: "Deer",
    path: BloomingForest,
  },
  {
    level: 10,
    XP: 3200,
    stage: "Peaceful Forest",
    desc: "A calm forest now surrounds you, offering a place where focus comes naturally.",
    nextUnlock: "Mountain Cabin",
    path: PeacefulForest,
  },
  {
    level: 11,
    XP: 4000,
    stage: "Forest Sanctuary",
    desc: "Your sanctuary becomes a refuge, filled with balance, growth, and serenity.",
    nextUnlock: "Waterfall",
    path: ForestSanctuary,
  },
  {
    level: 12,
    XP: 4900,
    stage: "Living Forest",
    desc: "Wildlife begins to flourish, bringing energy and harmony to your forest.",
    nextUnlock: "Fox",
    path: LivingForest,
  },
  {
    level: 13,
    XP: 5900,
    stage: "Evergreen Haven",
    desc: "Every season passes, yet your sanctuary remains vibrant and evergreen.",
    nextUnlock: "Lake",
    path: EvergreenHaven,
  },
  {
    level: 14,
    XP: 7000,
    stage: "Nature Refuge",
    desc: "A peaceful refuge emerges, where every corner reflects your dedication.",
    nextUnlock: "Campfire",
    path: NatureRefuge,
  },
  {
    level: 15,
    XP: 8200,
    stage: "Serene Valley",
    desc: "The valley opens before you, calm and expansive, shaped by countless hours of focus.",
    nextUnlock: "Snow Peaks",
    path: SereneValley,
  },
  {
    level: 16,
    XP: 9500,
    stage: "Mountain Retreat",
    desc: "High above the world, your sanctuary offers clarity and quiet reflection.",
    nextUnlock: "Sunrise",
    path: MountainRetreat,
  },
  {
    level: 17,
    XP: 10900,
    stage: "Highland Sanctuary",
    desc: "The highlands stretch endlessly, a testament to your unwavering commitment.",
    nextUnlock: "Eagle",
    path: HighlandSanctuary,
  },
  {
    level: 18,
    XP: 12400,
    stage: "Ancient Wilderness",
    desc: "Nature flourishes untouched, embodying years of patience and perseverance.",
    nextUnlock: "Aurora Sky",
    path: AncientWilderness,
  },
  {
    level: 19,
    XP: 14000,
    stage: "Legendary Forest",
    desc: "Your sanctuary has become a legendary landscape, admired for its timeless beauty.",
    nextUnlock: "Spirit Tree",
    path: LegendaryForest,
  },
  {
    level: 20,
    XP: 16000,
    stage: "Seren Sanctuary",
    desc: "A masterpiece of focus and tranquility. Your sanctuary has reached its fullest potential.",
    nextUnlock: null,
    path: SerenSanctuary,
  },
];