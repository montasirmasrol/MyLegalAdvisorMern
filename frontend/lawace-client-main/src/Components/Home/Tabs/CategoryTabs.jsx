import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import HeadingPart from "../../Common/HeadingPart";
import useMeals from "../../../Hooks/useMeals";
import MealCard from "../../Common/MealCard";
import LoadingSpinner from "../../Common/LoadingSpinner";

const CategoryTabs = () => {
  const [allMeals, isLoading] = useMeals();
  console.log(allMeals);

  return (
    <div>
      <HeadingPart
        heading="Meals by Category"
        subHeading="Our All Meals"
        para="At EduFeast Hostel, we understand that every meal is an opportunity to nourish the body and delight the senses. That's why we've curated a diverse menu to cater to all your cravings throughout the day. Explore our delicious offerings by category"
      />

      <div className="flex justify-center items-center my-12 text-center">
        <Tabs>
          <TabList>
            <Tab>
              <h1 className="font-exo font-bold">All Meals</h1>
            </Tab>
            <Tab>
              <h1 className="font-exo font-bold">Break Fast</h1>
            </Tab>
            <Tab>
              <h1 className="font-exo font-bold">Lunch</h1>
            </Tab>
            <Tab>
              <h1 className="font-exo font-bold">Dinner</h1>
            </Tab>
          </TabList>

          {isLoading ? (
            <LoadingSpinner smallHeight={true} />
          ) : (
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
                {allMeals.map((meal) => (
                  <MealCard key={meal._id} meal={meal} />
                ))}
              </div>
            </TabPanel>
          )}

          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
              {allMeals
                .filter((meal) => meal.category === "breakfast")
                .map((meal) => (
                  <MealCard key={meal._id} meal={meal} />
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
              {allMeals
                .filter((meal) => meal.category === "lunch")
                .map((meal) => (
                  <MealCard key={meal._id} meal={meal} />
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
              {allMeals
                .filter((meal) => meal.category === "dinner")
                .map((meal) => (
                  <MealCard key={meal._id} meal={meal} />
                ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default CategoryTabs;
