// File: app/routes/users+/$username_+/assessments.completed.tsx
import { Link, redirect, useLoaderData } from "react-router";
import { Button } from "#app/components/ui/button.tsx";
import { requireUserId } from "#app/utils/auth.server.ts";
import { prisma } from "#app/utils/db.server.ts";

// Define Route types
namespace Route {
  export interface LoaderArgs {
    request: Request;
    params: Record<string, string>;
  }
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const userId = await requireUserId(request);
  
  try {
    // Find the completed assessment for this user
    const assessment = await prisma.assessment.findFirst({
      where: {
        userId,
        status: "COMPLETED"
      },
      include: {
        ratings: true,
        supervisorRatings: true,
      },
      orderBy: {
        completedAt: 'desc'
      }
    });
    
    // If no completed assessment, redirect to the assessment page
    if (!assessment) {
      return redirect(`/users/${params.username}/assessments`);
    }
    
    // Get competencies for displaying results
    const competencies = await prisma.competency.findMany({
      include: {
        levels: {
          include: {
            behaviors: true,
          },
        },
      },
    });
    
    return { assessment, competencies, userId };
  } catch (error) {
    console.error("Error loading completed assessment:", error);
    return { 
      error: "Failed to load completed assessment data",
      assessment: null,
      competencies: [],
      userId
    };
  }
}

export default function AssessmentCompleted() {
  const { assessment, competencies, error } = useLoaderData<typeof loader>();
  
  if (error) {
    return (
      <div className="container my-8">
        <div className="p-4 bg-red-100 text-red-700 rounded-md mb-4">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-8">
      <h2 className="text-4xl font-bold mb-6">Assessment Completed</h2>
      
      <div className="p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
        <p className="mb-4">
          Your Safety Functional Competency Assessment has been successfully submitted.
          Thank you for taking the time to complete this assessment.
        </p>
        
        <p className="mb-4">
          Your assessment was completed on: {assessment?.completedAt ? new Date(assessment.completedAt).toLocaleDateString() : 'N/A'}
        </p>
      </div>
      
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Assessment Summary</h3>
        
        {assessment && assessment.ratings && assessment.ratings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="bg-gray-100">
                <th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0 text-left">Competency</th>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0 text-center">Criticality</th>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0 text-center">Current Level</th>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0 text-center">Expected Level</th>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0 text-center">Development Needed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {assessment.ratings.map((rating) => {
                  const competency = competencies.find(c => c.id === rating.competencyId);
                  return (
                    <tr key={rating.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{competency?.name || 'Unknown'}</td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-center">{rating.criticality || '-'}</td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-center">{rating.currentLevel || '-'}</td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-center">{rating.expectedLevel || '-'}</td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-center">{rating.developmentNeeded || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No assessment data available.</p>
        )}
      </div>
    </div>
  );
}
