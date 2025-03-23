
import React from 'react';

interface ComparisonSectionProps {
  title: string;
}

const ComparisonSection: React.FC<ComparisonSectionProps> = ({ title }) => {
  return (
    <tr>
      <td colSpan={100} className="bg-gray-100 p-2">
        <h3 className="font-medium">{title}</h3>
      </td>
    </tr>
  );
};

export default ComparisonSection;
