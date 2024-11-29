import { API_URL } from "@/constants/API_URL";

interface Activity {
  _id: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  deal: string;
  location: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default async function Home() {
  const response = await fetch(`${API_URL}/activities`);
  const activities = await response.json();

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Available Activities</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity: Activity) => (
          <div 
            key={activity._id} 
            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{activity.name}</h2>
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                {activity.type}
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600">{activity.location}</p>
              <div className="mt-2">
                <span className="text-2xl font-bold">₹{activity.price}</span>
                {activity.originalPrice && (
                  <span className="ml-2 text-gray-500 line-through">
                    ₹{activity.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {activity.deal !== "No deal" && (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm inline-block">
                {activity.deal}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
