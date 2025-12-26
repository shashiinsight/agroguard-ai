import riceFieldImg from '@/assets/rice-field.jpg';
import vineyardImg from '@/assets/vineyard.jpg';
import cottonFieldImg from '@/assets/cotton-field.jpg';
import tomatoImg from '@/assets/tomato-plants.jpg';
import pesticideAppImg from '@/assets/pesticide-application.jpg';

export interface Pesticide {
  id: number;
  name: string;
  category: 'Insecticide' | 'Herbicide' | 'Fungicide' | 'Rodenticide' | 'Bactericide';
  usedFor: string[];
  hazards: string;
  precautions: string;
  activeIngredient: string;
  applicationMethod: string;
  safetyInterval: string;
  image?: string;
}

export const pesticides: Pesticide[] = [
  {
    id: 1,
    name: "Chlorpyrifos",
    category: "Insecticide",
    usedFor: ["Cotton", "Rice", "Wheat", "Vegetables"],
    hazards: "Moderately toxic to humans. May cause nausea, dizziness, and confusion. Highly toxic to aquatic organisms and bees.",
    precautions: "Wear protective clothing, gloves, and mask during application. Avoid contact with skin and eyes. Keep away from water bodies. Do not apply near flowering plants.",
    activeIngredient: "Chlorpyrifos 20% EC",
    applicationMethod: "Foliar spray",
    safetyInterval: "14 days before harvest",
    image: cottonFieldImg
  },
  {
    id: 2,
    name: "Glyphosate",
    category: "Herbicide",
    usedFor: ["Orchards", "Plantation crops", "Non-crop areas"],
    hazards: "Low toxicity to humans but may cause eye and skin irritation. Controversial long-term health effects. Toxic to some aquatic plants.",
    precautions: "Avoid spray drift to non-target crops. Use protective equipment. Do not apply near water sources. Wait until weeds are actively growing for best results.",
    activeIngredient: "Glyphosate 41% SL",
    applicationMethod: "Directed spray",
    safetyInterval: "7 days",
    image: pesticideAppImg
  },
  {
    id: 3,
    name: "Mancozeb",
    category: "Fungicide",
    usedFor: ["Tomatoes", "Potatoes", "Grapes", "Citrus"],
    hazards: "May cause skin sensitization. Potential thyroid effects with prolonged exposure. Eye and respiratory irritant.",
    precautions: "Wear mask and goggles during mixing and application. Wash hands thoroughly after handling. Store in cool, dry place away from food.",
    activeIngredient: "Mancozeb 75% WP",
    applicationMethod: "Foliar spray",
    safetyInterval: "21 days before harvest",
    image: tomatoImg
  },
  {
    id: 4,
    name: "Imidacloprid",
    category: "Insecticide",
    usedFor: ["Rice", "Cotton", "Sugarcane", "Vegetables"],
    hazards: "Low mammalian toxicity but highly toxic to bees and other pollinators. May contaminate groundwater.",
    precautions: "Do not apply during flowering. Avoid application when bees are foraging. Use seed treatment method when possible. Follow integrated pest management.",
    activeIngredient: "Imidacloprid 17.8% SL",
    applicationMethod: "Seed treatment / Foliar spray",
    safetyInterval: "30 days",
    image: riceFieldImg
  },
  {
    id: 5,
    name: "Carbendazim",
    category: "Fungicide",
    usedFor: ["Cereals", "Fruits", "Vegetables", "Ornamentals"],
    hazards: "Potential reproductive toxicity. May cause skin and eye irritation. Suspected carcinogen in some studies.",
    precautions: "Use appropriate PPE. Avoid prolonged exposure. Do not mix with acidic pesticides. Rotate with different fungicide groups to prevent resistance.",
    activeIngredient: "Carbendazim 50% WP",
    applicationMethod: "Foliar spray / Seed treatment",
    safetyInterval: "14 days",
    image: vineyardImg
  },
  {
    id: 6,
    name: "Cypermethrin",
    category: "Insecticide",
    usedFor: ["Cotton", "Vegetables", "Fruits", "Stored grains"],
    hazards: "Neurotoxic in high doses. May cause skin tingling and irritation. Highly toxic to fish and aquatic invertebrates.",
    precautions: "Keep away from water bodies. Use protective clothing. Avoid skin contact. Do not apply in windy conditions. Store away from food and feed.",
    activeIngredient: "Cypermethrin 25% EC",
    applicationMethod: "Foliar spray",
    safetyInterval: "7 days",
    image: cottonFieldImg
  },
  {
    id: 7,
    name: "2,4-D",
    category: "Herbicide",
    usedFor: ["Wheat", "Rice", "Sugarcane", "Lawns"],
    hazards: "Moderate toxicity. May cause skin and eye irritation. Potentially carcinogenic with prolonged exposure.",
    precautions: "Apply on calm days to prevent drift. Avoid contact with desirable plants. Wear protective gear. Do not apply near sensitive crops.",
    activeIngredient: "2,4-D Amine Salt 58% SL",
    applicationMethod: "Post-emergence spray",
    safetyInterval: "30 days",
    image: riceFieldImg
  },
  {
    id: 8,
    name: "Zinc Phosphide",
    category: "Rodenticide",
    usedFor: ["Field crops", "Orchards", "Storage areas"],
    hazards: "Highly toxic to humans and animals if ingested. Releases toxic phosphine gas in stomach. Can cause multi-organ failure.",
    precautions: "Use tamper-resistant bait stations. Keep away from children and pets. Wear gloves when handling. Dispose of dead rodents safely. Do not use near food storage.",
    activeIngredient: "Zinc Phosphide 80% WP",
    applicationMethod: "Bait application",
    safetyInterval: "N/A - Not for food crops",
    image: pesticideAppImg
  },
  {
    id: 9,
    name: "Streptomycin",
    category: "Bactericide",
    usedFor: ["Apple", "Pear", "Tomatoes", "Peppers"],
    hazards: "May cause allergic reactions in sensitive individuals. Potential for antibiotic resistance development.",
    precautions: "Limit applications to reduce resistance. Avoid contact with skin. Do not use on crops intended for export to certain countries. Alternate with copper-based products.",
    activeIngredient: "Streptomycin Sulphate 90% SP",
    applicationMethod: "Foliar spray",
    safetyInterval: "14 days",
    image: tomatoImg
  },
  {
    id: 10,
    name: "Thiamethoxam",
    category: "Insecticide",
    usedFor: ["Rice", "Maize", "Vegetables", "Cotton"],
    hazards: "Low acute toxicity to mammals. Highly toxic to bees. Persistent in soil and water.",
    precautions: "Avoid application during flowering. Use as seed treatment when possible. Do not apply when pollinators are active. Follow IPM guidelines.",
    activeIngredient: "Thiamethoxam 25% WG",
    applicationMethod: "Seed treatment / Soil drench",
    safetyInterval: "21 days",
    image: riceFieldImg
  },
  {
    id: 11,
    name: "Copper Hydroxide",
    category: "Fungicide",
    usedFor: ["Citrus", "Grapes", "Tomatoes", "Coffee"],
    hazards: "May cause skin and eye irritation. Copper accumulation in soil with repeated use. Phytotoxic in cool, wet conditions.",
    precautions: "Do not apply in hot conditions. Avoid application before rain. Use lower rates on sensitive crops. Monitor soil copper levels.",
    activeIngredient: "Copper Hydroxide 77% WP",
    applicationMethod: "Foliar spray",
    safetyInterval: "Same day application safe",
    image: vineyardImg
  },
  {
    id: 12,
    name: "Atrazine",
    category: "Herbicide",
    usedFor: ["Maize", "Sugarcane", "Sorghum"],
    hazards: "Potential endocrine disruptor. Groundwater contaminant. May persist in soil for extended periods.",
    precautions: "Do not use in areas with shallow water table. Apply only to labeled crops. Avoid runoff to water bodies. Use pre-emergence for best results.",
    activeIngredient: "Atrazine 50% WP",
    applicationMethod: "Pre-emergence spray",
    safetyInterval: "60 days",
    image: cottonFieldImg
  }
];

export const categories = ['All', 'Insecticide', 'Herbicide', 'Fungicide', 'Rodenticide', 'Bactericide'] as const;

export const getCategoryColor = (category: Pesticide['category']) => {
  const colors = {
    Insecticide: 'bg-amber-100 text-amber-800 border-amber-200',
    Herbicide: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Fungicide: 'bg-purple-100 text-purple-800 border-purple-200',
    Rodenticide: 'bg-red-100 text-red-800 border-red-200',
    Bactericide: 'bg-blue-100 text-blue-800 border-blue-200',
  };
  return colors[category];
};
