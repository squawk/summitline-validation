// File: app/routes/users+/$username_+/assessments.index.tsx
import { type Competency, type CompetencyLevel, type Behavior } from "@prisma/client";
import { redirect, Form, useActionData, useLoaderData, useNavigation } from "react-router"; 
import { toast } from "sonner";
import { Button } from "#app/components/ui/button.tsx";
import { requireUserId } from "#app/utils/auth.server.ts";
import { prisma } from "#app/utils/db.server.ts";

// Define Route types
namespace Route {
  export interface LoaderArgs {
    request: Request;
    params: Record<string, string>;
  }
  
  export interface ActionArgs {
    request: Request;
    params: Record<string, string>;
  }
}

// Define a type for our assessment data
type Rating = {
  id: string;
  assessmentId: string;
  competencyId: string;
  criticality?: number;
  currentLevel?: number;
  expectedLevel?: number;
  developmentNeeded?: number;
  comments?: string | null;
}

type AssessmentData = {
  id: string;
  ratings?: Rating[];
  supervisorRatings?: Rating[];
  [key: string]: any
};

type CompetencyWithRelations = Competency & {
  levels: (CompetencyLevel & {
    behaviors: Behavior[];
  })[];
};

interface CompetencySectionProps {
  competency: CompetencyWithRelations;
  supervisor?: boolean;
  draftAssessment: AssessmentData | null;
}

// CompetencySection component with draft assessment values
const CompetencySection = ({ competency, supervisor = false, draftAssessment }: CompetencySectionProps) => {
  // Find the rating for this competency if it exists in the draft assessment
  const findRating = (assessmentId: string | undefined, competencyId: string): Rating | null | undefined => {
    if (!assessmentId) return null;
    
    // Try to find the assessment rating for this competency
    const rating = draftAssessment?.ratings?.find(r => 
      r.competencyId === competencyId && r.assessmentId === assessmentId
    );
    
    return rating;
  };
  
  // Get the rating for this competency
  const rating = findRating(draftAssessment?.id, competency.id);
  
  // Find supervisor rating if it exists
  const supervisorRating = draftAssessment?.supervisorRatings?.find((r: Rating) => 
    r.competencyId === competency.id && r.assessmentId === draftAssessment.id
  );

  return (
    <div className="competency-section rounded-lg shadow p-6 mb-8">
      <h3 className="text-2xl font-bold">{competency.name}</h3>
      
      <div>
        <div className="mb-8">
          <p>Description: {competency.description}</p>
        </div>
        
        <div className="mt-8">
          {competency.levels.map((level: CompetencyLevel & { behaviors: Behavior[] }) => (
            <div key={level.level} className="level-container">
              <h5 className="font-bold">Level {level.level}: {level.title}</h5>
              <ul className="list-disc pl-8 space-y-2 my-2">
                {level.behaviors.map((behavior: Behavior, index: number) => (
                  <li key={index}>
                    {behavior.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="competency-ratings my-6">
          <h4 className="text-lg font-bold">Competency Ratings:</h4>

          <p className="mb-6">
            Please rate the following questions as they relate to the
            competency, behaviors, and proficiency levels listed above in
            helping the Safety Team in accomplishing our strategy.
          </p>

          <table className="w-full border-collapse border border-gray-400">
            <tbody>
              <tr>
                <th className="border border-gray-300"></th>
                <th className="border border-gray-300"></th>
                <th className="border border-gray-300">1</th>
                <th className="border border-gray-300">2</th>
                <th className="border border-gray-300">3</th>
                <th className="border border-gray-300">4</th>
                <th className="border border-gray-300">5</th>
                <th className="border border-gray-300"></th>
              </tr>

              <tr>
                <td className="border border-gray-300 p-3">
                  Overall, how <strong>critical</strong> is this competency to
                  your role as a Summit Safety Professional?
                </td>
                <td className="align-right border border-gray-300 p-3 font-bold">
                  Not Critical
                </td>
                {[1, 2, 3, 4, 5].map((num) => (
                  <td
                    key={num}
                    className="border border-gray-300 p-3 text-center cursor-pointer"
                    onClick={() => {
                      document.getElementById(`criticality-${competency.id}-${num}`)?.click();
                    }}
                  >
                    <input
                      type="radio"
                      id={`criticality-${competency.id}-${num}`}
                      name={`criticality-${competency.id}`}
                      value={num}
                      defaultChecked={rating?.criticality === num}
                    />
                  </td>
                ))}
                <td className="border border-gray-300 p-3 font-bold">
                  Extremely Critical
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 p-3">
                  Using the levels of proficiency and associated behaviors stated
                  above (in this competency), at what level of proficiency would
                  you say you are <strong>currently</strong> performing this
                  competency?
                </td>
                <td className="align-right border border-gray-300 p-3 font-bold">
                  Level 1
                </td>
                {[1, 2, 3, 4, 5].map((num) => (
                  <td
                    key={num}
                    className="border border-gray-300 p-3 text-center cursor-pointer"
                    onClick={() => {
                      document.getElementById(`current-${competency.id}-${num}`)?.click();
                    }}
                  >
                    <input
                      type="radio"
                      id={`current-${competency.id}-${num}`}
                      name={`current-${competency.id}`}
                      value={num}
                      defaultChecked={rating?.currentLevel === num}
                    />
                  </td>
                ))}
                <td className="align-right border border-gray-300 p-3 font-bold">
                  Level 5
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 p-3">
                  At what level of proficiency do you feel you are expected to
                  perform this competency (by manager or customers)?
                </td>
                <td className="align-right border border-gray-300 p-3 font-bold">
                  Level 1
                </td>
                {[1, 2, 3, 4, 5].map((num) => (
                  <td
                    key={num}
                    className="border border-gray-300 p-3 text-center cursor-pointer"
                    onClick={() => {
                      document.getElementById(`expected-${competency.id}-${num}`)?.click();
                    }}
                  >
                    <input
                      type="radio"
                      id={`expected-${competency.id}-${num}`}
                      name={`expected-${competency.id}`}
                      value={num}
                      defaultChecked={rating?.expectedLevel === num}
                    />
                  </td>
                ))}
                <td className="align-right border border-gray-300 p-3 font-bold">
                  Level 5
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 p-3">
                  Please rate the amount of development you need to improve your
                  performance of this competency.
                </td>
                <td className="align-right border border-gray-300 p-3 font-bold">
                  Little or No Development
                </td>
                {[1, 2, 3, 4, 5].map((num) => (
                  <td
                    key={num}
                    className="border border-gray-300 p-3 text-center cursor-pointer"
                    onClick={() => {
                      document.getElementById(`development-${competency.id}-${num}`)?.click();
                    }}
                  >
                    <input
                      type="radio"
                      id={`development-${competency.id}-${num}`}
                      name={`development-${competency.id}`}
                      value={num}
                      defaultChecked={rating?.developmentNeeded === num}
                    />
                  </td>
                ))}
                <td className="align-right border border-gray-300 p-3 font-bold">
                  A Lot of Development Needed
                </td>
              </tr>
            </tbody>
          </table>

          <p className="mt-3">Comments:</p>
          <textarea
            id={`comments-${competency.id}`}
            name={`comments-${competency.id}`}
            className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            defaultValue={rating?.comments || ''}
          ></textarea>

          {supervisor && (
            <>
            <h4 className="text-lg font-bold">Supervisor Ratings:</h4>
              <p className="my-6">
                Read through each of the behaviors below with the associated
                proficiency level for each competency. The levels of proficiency
                are progressive. If your employee is performing at a "level 3"
                it is assumed the employee is performing level 1, 2 and 3
                behaviors. To be considered proficient at a specific level, then
                the person should be observably and consistently exhibiting all
                or comparable behaviors at that level.
              </p>
              <p className="mb-6">Please provide an overall rating of your direct reports as they relate to the competency, behaviors, and proficiency levels listed above.</p>
              <table className="w-full border-collapse border rounded-md border-gray-400">
                <tbody>
                  <tr>
                    <th className="border border-gray-300"></th>
                    <th className="border border-gray-300"></th>
                    <th className="border border-gray-300">1</th>
                    <th className="border border-gray-300">2</th>
                    <th className="border border-gray-300">3</th>
                    <th className="border border-gray-300">4</th>
                    <th className="border border-gray-300">5</th>
                    <th className="border border-gray-300"></th>
                  </tr>

                  <tr>
                    <td className="border border-gray-300 p-3">
                    Overall, how <strong>critical</strong> is this competency to your employee’s role as a Summit Safety Professional?
                    </td>
                    <td className="align-right border border-gray-300 p-3 font-bold">
                      Not Critical
                    </td>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <td
                        key={num}
                        className="border border-gray-300 p-3 text-center cursor-pointer"
                        onClick={() => {
                          document.getElementById(`supervisor-criticality-${competency.id}-${num}`)?.click();
                        }}
                      >
                        <input
                          type="radio"
                          id={`supervisor-criticality-${competency.id}-${num}`}
                          name={`supervisor-criticality-${competency.id}`}
                          value={num}
                          defaultChecked={supervisorRating?.criticality === num}
                        />
                      </td>
                    ))}
                    <td className="align-right border border-gray-300 p-3 font-bold">
                      Extremely Critical
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-gray-300 p-3">
                      At what level of proficiency is the employee
                      <strong> currently </strong> performing this competency?
                    </td>
                    <td className="align-right border border-gray-300 p-3 font-bold">
                      Level 1
                    </td>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <td
                        key={num}
                        className="border border-gray-300 p-3 text-center cursor-pointer"
                        onClick={() => {
                          document.getElementById(`supervisor-current-${competency.id}-${num}`)?.click();
                        }}
                      >
                        <input
                          type="radio"
                          id={`supervisor-current-${competency.id}-${num}`}
                          name={`supervisor-current-${competency.id}`}
                          value={num}
                          defaultChecked={supervisorRating?.currentLevel === num}
                        />
                      </td>
                    ))}
                    <td className="align-right border border-gray-300 p-3 font-bold">
                      Level 5
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-gray-300 p-3">
                      At what level of proficiency do you expect the employee to
                      perform this competency?
                    </td>
                    <td className="align-right border border-gray-300 p-3 font-bold">
                      Level 1
                    </td>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <td
                        key={num}
                        className="border border-gray-300 p-3 text-center cursor-pointer"
                        onClick={() => {
                          document.getElementById(`supervisor-expected-${competency.id}-${num}`)?.click();
                        }}
                      >
                        <input
                          type="radio"
                          id={`supervisor-expected-${competency.id}-${num}`}
                          name={`supervisor-expected-${competency.id}`}
                          value={num}
                          defaultChecked={supervisorRating?.expectedLevel === num}
                        />
                      </td>
                    ))}
                    <td className="align-right border border-gray-300 p-3 font-bold">
                      Level 5
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-gray-300 p-3">
                      Please rate the amount of development the employee needs to
                      improve their performance of this competency.
                    </td>
                    <td className="align-right border border-gray-300 p-3 font-bold">
                      Little or No Development
                    </td>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <td
                        key={num}
                        className="border border-gray-300 p-3 text-center cursor-pointer"
                        onClick={() => {
                          document.getElementById(`supervisor-development-${competency.id}-${num}`)?.click();
                        }}
                      >
                        <input
                          type="radio"
                          id={`supervisor-development-${competency.id}-${num}`}
                          name={`supervisor-development-${competency.id}`}
                          value={num}
                          defaultChecked={supervisorRating?.developmentNeeded === num}
                        />
                      </td>
                    ))}
                    <td className="align-right border border-gray-300 p-3 font-bold">
                      A Lot of Development Needed
                    </td>
                  </tr>
                </tbody>
              </table>

              <p className="mt-3">Supervisor Comments:</p>
              <textarea
                id={`supervisor-comments-${competency.id}`}
                name={`supervisor-comments-${competency.id}`}
                className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                defaultValue={supervisorRating?.comments || ''}
              ></textarea>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export async function loader({ request }: Route.LoaderArgs) {
  const userId = await requireUserId(request);
  
  try {
    // Find draft assessment for this user
    const draftAssessment = await prisma.assessment.findFirst({
      where: {
        userId
      },
      include: {
        ratings: true,
        supervisorRatings: true,
      },
    });

    // if assessment complete, redirect to completed page
    if (draftAssessment?.status === 'COMPLETED') {
      // return redirect(`/users/${userId}/assessments/completed`);
    }
    
    // Get competencies with levels and behaviors
    const competencies = await prisma.competency.findMany({
      include: {
        levels: {
          include: {
            behaviors: true,
          },
        },
      },
    });

    
    return { competencies, draftAssessment, userId };
  } catch (error) {
    console.error("Error loading assessments:", error);
    return { 
      competencies: [], 
      draftAssessment: null, 
      userId,
      error: "Failed to load assessment data" 
    };
  }
}

export async function action({ request, params }: Route.ActionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  
  try {
    // Get or create assessment
    const assessmentId = formData.get('assessmentId') as string | null;
    console.log('Assessment ID:', assessmentId);
    const now = new Date();
    
    let assessment;
    
    if (assessmentId) {
      // Update existing assessment
      assessment = await prisma.assessment.update({
        where: { id: assessmentId },
        data: { 
          completedAt: now,
          status: "COMPLETED"
        }
      });
    } else {
      // Create new assessment
      assessment = await prisma.assessment.create({
        data: {
          userId,
          completedAt: now,
          status: "COMPLETED"
        }
      });
    }
    
    // Process competency ratings
    const competencyIds = formData.getAll('competencyId') as string[];
    
    for (const competencyId of competencyIds) {
      const criticality = parseInt(formData.get(`criticality-${competencyId}`) as string || '0');
      const currentLevel = parseInt(formData.get(`current-${competencyId}`) as string || '0');
      const expectedLevel = parseInt(formData.get(`expected-${competencyId}`) as string || '0');
      const developmentNeeded = parseInt(formData.get(`development-${competencyId}`) as string || '0');
      const comments = formData.get(`comments-${competencyId}`) as string || '';
      
      if (criticality || currentLevel || expectedLevel || developmentNeeded) {
        await prisma.assessmentRating.upsert({
          where: {
            assessmentId_competencyId: {
              assessmentId: assessment.id,
              competencyId
            }
          },
          update: {
            criticality,
            currentLevel,
            expectedLevel,
            developmentNeeded,
            comments
          },
          create: {
            assessmentId: assessment.id,
            competencyId,
            criticality,
            currentLevel, 
            expectedLevel,
            developmentNeeded,
            comments
          }
        });
      }
      
      // Process supervisor ratings
      const supervisorCriticality = parseInt(formData.get(`supervisor-criticality-${competencyId}`) as string || '0');
      const supervisorCurrentLevel = parseInt(formData.get(`supervisor-current-${competencyId}`) as string || '0');
      const supervisorExpectedLevel = parseInt(formData.get(`supervisor-expected-${competencyId}`) as string || '0');
      const supervisorDevelopmentNeeded = parseInt(formData.get(`supervisor-development-${competencyId}`) as string || '0');
      const supervisorComments = formData.get(`supervisor-comments-${competencyId}`) as string || '';
      
      if (supervisorCurrentLevel || supervisorExpectedLevel || supervisorDevelopmentNeeded) {
        await prisma.supervisorRating.upsert({
          where: {
            assessmentId_competencyId: {
              assessmentId: assessment.id,
              competencyId
            }
          },
          update: {
            criticality: supervisorCriticality,
            currentLevel: supervisorCurrentLevel,
            expectedLevel: supervisorExpectedLevel,
            developmentNeeded: supervisorDevelopmentNeeded,
            comments: supervisorComments
          },
          create: {
            assessmentId: assessment.id,
            competencyId,
            criticality: supervisorCriticality,
            currentLevel: supervisorCurrentLevel,
            expectedLevel: supervisorExpectedLevel,
            developmentNeeded: supervisorDevelopmentNeeded,
            comments: supervisorComments
          }
        });
      }
    }
    
    return redirect(`/users/${params.username}/assessments/completed`);
  } catch (error) {
    console.error('Error saving assessment:', error);
    return { 
      success: false, 
      error: 'Failed to save assessment. Please try again.' 
    };
  }
}

export default function Assessment() {
  const { competencies, draftAssessment, userId, error } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  
  // Show error message if there was an error
  if (error) {
    toast.error(error);
  }
  
  if (actionData?.error) {
    toast.error(actionData.error);
  }

  return (
    <div className="container my-8">
      <h2 className="text-4xl font-bold">Safety Functional Competency Assessment</h2>
      
      <div className="mt-6 p-4 rounded-md">
        <p>
          Read through each of the behaviors below with the associated proficiency level for each competency. 
          The levels of proficiency are progressive. If you are performing at a "level 3" it is assumed 
          you are performing level 1, 2 and 3 behaviors. To be considered proficient at a specific level, 
          then you should be observably and consistently exhibiting <strong>all</strong> or comparable 
          behaviors at that level.
        </p>
      </div>
      
      <Form method="post" className="mt-4">
        {/* Add hidden field for assessment ID if we're updating a draft */}
        {draftAssessment?.id ? (
          <input 
            type="hidden" 
            name="assessmentId" 
            value={draftAssessment.id} 
          />
        ) : null}
        
        {/* Add hidden field with all competency IDs for easier processing */}
        {competencies.map((competency: CompetencyWithRelations) => (
          <input 
            key={`competency-id-${competency.id}`}
            type="hidden" 
            name="competencyId" 
            value={competency.id} 
          />
        ))}
        
        <div className="mt-6">
          {competencies.map((competency: CompetencyWithRelations) => (
            <CompetencySection 
              key={competency.id} 
              competency={competency} 
              supervisor={true}
              draftAssessment={draftAssessment}
            />
          ))}
        </div>
        
        <div className="assessment-footer my-8 flex justify-center">
          <Button 
            type="submit" 
            className="px-8 py-3 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Assessment"}
          </Button>
        </div>
      </Form>
    </div>
  );
}