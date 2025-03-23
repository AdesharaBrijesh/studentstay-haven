
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui';

interface DaySelectorProps {
  foodMenu: Record<string, { breakfast: string[]; lunch: string[]; dinner: string[] }>;
}

const DaySelector: React.FC<DaySelectorProps> = ({ foodMenu }) => {
  return (
    <Tabs defaultValue="monday" className="w-full">
      <div className="overflow-x-auto pb-2">
        <TabsList className="bg-primary/5 p-1 mb-4 inline-flex">
          {Object.keys(foodMenu).map((day) => (
            <TabsTrigger
              key={day}
              value={day}
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {Object.entries(foodMenu).map(([day, meals]) => (
        <TabsContent key={day} value={day} className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Breakfast</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {meals.breakfast.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Lunch</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {meals.lunch.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Dinner</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {meals.dinner.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DaySelector;
