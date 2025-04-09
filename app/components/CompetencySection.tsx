// File: app/components/CompetencySection.tsx
import  { type Competency, type CompetencyLevel, type Behavior } from "@prisma/client";
// import  { type CompetencyRating } from "#app/types.ts";

// Define the AssessmentData type for use in this component
type AssessmentData = { id: string; ratings?: any[]; [key: string]: any };

interface CompetencySectionProps {
  competency: Competency & {
    levels: (CompetencyLevel & {
      behaviors: Behavior[];
    })[];
  };
  // updateRatings: (competencyId: string, ratings: CompetencyRating) => void;
  supervisor?: boolean;
  draftAssessment?: AssessmentData | null;
}

export default function CompetencySection({ competency, supervisor = false, draftAssessment }: CompetencySectionProps) {

  return (
    <div className="competency-section rounded-lg shadow p-6 mb-8">
        <h3 className="text-2xl font-bold">{competency.name}</h3>
      
      <div>
          <div className="mb-8">
            <p>Description: {competency.description}</p>
          </div>
          
          <div className="mt-8">
            
            {competency.levels.map((level) => (
              <div key={level.level} className="level-container">
                <h5>Level {level.level}: {level.title}</h5>
                <ul className="list-disc pl-8 space-y-2 my-2">
                  {level.behaviors.map((behavior, index) => (
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
                      />
                  </td>
                ))}
                <td className="align-right border border-gray-300 p-3 font-bold">
                  A Lot of Development Needed
                </td>
              </tr>
            </table>

            <p>Comments:</p>
            <textarea
              id={`comments-${competency.id}`}
              name={`comments-${competency.id}`}
              className="w-full border border-gray-300 p-3"
            ></textarea>

            {supervisor && (
              <>
                <p className="my-6">
                  Read through each of the behaviors below with the associated
                  proficiency level for each competency. The levels of proficiency
                  are progressive. If your employee is performing at a "level 3"
                  it is assumed the employee is performing level 1, 2 and 3
                  behaviors. To be considered proficient at a specific level, then
                  the person should be observably and consistently exhibiting all
                  or comparable behaviors at that level. In addition, please rate
                  the level of importance the competency is to their job and the
                  amount of development you feel they need to improve their level
                  of performance for each competency. Record your responses at the
                  bottom of the page.
                </p>
                <p className="mb-6">Please provide an overall rating of your direct reports as they relate to the competency, behaviors, and proficiency levels listed above.</p>
                <table className="w-full border-collapse border border-gray-400">
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
                        />
                      </td>
                    ))}
                    <td className="align-right border border-gray-300 p-3 font-bold">
                      A Lot of Development Needed
                    </td>
                  </tr>
                </table>

                {/* <p>Supervisor Comments:</p>
                <textarea
                  id={`supervisor-comments-${competency.id}`}
                  name={`supervisor-comments-${competency.id}`}
                  className="w-full border border-gray-300 p-3"
                ></textarea> */}
              </>
            )}
          </div>
        </div>
    </div>
  );
}