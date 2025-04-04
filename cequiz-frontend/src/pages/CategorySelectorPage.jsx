// src/pages/CategorySelectorPage.jsx

import React from "react";
import CategoryCard from "../components/CategoryCard";

const categories = [
  { value: "Calculus", label: "Calculus", description: "Basic definitions and concepts in Calculus." },
  { value: "Differential Equations", label: "Differential Equations", description: "Solve differential equations in engineering." },
  { value: "EDA", label: "Engineering Data Analysis", description: "Techniques in engineering data analysis." },
  { value: "Numerical Methods", label: "Numerical Methods", description: "Numerical techniques for engineering problems." },
  { value: "Physics", label: "Physics for Engineers", description: "Physics principles applied to engineering." },
  { value: "Economics", label: "Economics", description: "Economic principles in engineering projects." },
  { value: "Construction Surveying", label: "Construction Surveying and Layout", description: "Techniques for surveying and layout." },
  { value: "Materials for Construction", label: "Materials for Construction", description: "Properties and selection of construction materials." },
  { value: "Highway", label: "Highway Engineering", description: "Design and construction of highways." },
  { value: "COSH", label: "Construction Occupational Safety and Health", description: "Safety practices on construction sites." },
  { value: "Transportation", label: "Transportation Engineering", description: "Planning and design of transportation systems." },
  { value: "Quantity Surveying", label: "Quantity Surveying", description: "Cost estimation and quantity surveying." },
  { value: "CMPM", label: "Construction Management Principles and Methods", description: "Principles of construction management." },
  { value: "Hydrostatics", label: "Hydrostatics", description: "Study of fluids at rest." },
  { value: "Fluid Flow", label: "Fluid Flow", description: "Dynamics of fluids in motion." },
  { value: "Buoyancy", label: "Buoyancy and Flotation", description: "Principles of buoyancy and flotation." },
  { value: "Relative Equilibrium of Liquids", label: "Relative Equilibrium of Liquids", description: "Equilibrium concepts in liquids." },
  { value: "Hydrodynamics", label: "Hydrodynamics", description: "Study of fluids in motion." },
  { value: "Water Supply", label: "Water Supply Soil Properties", description: "Properties of soils for water supply systems." },
  { value: "Soils Classification", label: "Soils Classification", description: "Classification of soils." },
  { value: "Soil Fluid Flow", label: "Fluid Flow through Soil Mass", description: "Movement of fluids through soils." },
  { value: "Soil Stresses", label: "Stresses in Soil Mass", description: "Stress analysis in soils." },
  { value: "Soil Strength and Tests", label: "Soil Strength and Tests", description: "Testing soil strength." },
  { value: "Bearing Capacity", label: "Bearing Capacity", description: "Load capacity of soil." },
  { value: "Consolidation", label: "Consolidation and Settlement", description: "Soil consolidation and settlement analysis." },
  { value: "Compaction", label: "Compaction", description: "Soil compaction techniques." },
  { value: "Earth Pressure", label: "Lateral Earth Pressure", description: "Calculating lateral earth pressure." },
  { value: "Slope Stability", label: "Slope Stability", description: "Analysis of slope stability." },
  { value: "Engineering Mechanics", label: "Engineering Mechanics", description: "Fundamentals of mechanics." },
  { value: "Strema", label: "Strength of Materials", description: "Properties and analysis of materials." },
  { value: "TOS", label: "Theory of Structures", description: "Theoretical concepts in structural analysis." },
  { value: "Reinforced Concrete Design", label: "Reinforced Concrete Structures", description: "Design principles of reinforced concrete." },
  { value: "Prestressed Concrete Design", label: "Prestressed Concrete Beams", description: "Design of prestressed concrete beams." },
  { value: "Steel Design", label: "Steel Structures", description: "Design principles for steel structures." },
  { value: "Steel Connection Design", label: "Steel Connection Design", description: "Designing connections in steel structures." },
  { value: "Footing", label: "Foundation Design", description: "Principles of foundation design." },
  { value: "CMT", label: "Construction Materials Testing", description: "Testing of construction materials." },
  { value: "NSCP2015", label: "Application of the Governing Codes of Practice NSCP2015", description: "Understanding NSCP2015 guidelines." }
];

const CategorySelectorPage = () => {
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary">Select a Quiz Category</h2>
      <div className="row">
        {categories.map((cat) => (
          <div key={cat.value} className="col-md-4 mb-4">
            <CategoryCard
              category={cat.value}
              label={cat.label}
              description={cat.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelectorPage;
