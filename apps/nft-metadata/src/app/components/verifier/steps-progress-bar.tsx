import React from 'react'

/*
  https://fancytailwind.com/app/fancy-laboratory/molecules/steps/steps4 used as a base
  A free to use responsive component implementation
*/

export function StepsProgressBar({
  steps
}: {
  steps: Array<any>
}) {

  return (
    <nav className="mx-auto w-full max-w-7xl bg-transparent" aria-label="Progress Steps">
      <ol className="grid grid-flow-col pl-0">
        {steps.map((step, index) => (
          <div key={step.id} className="col-span-full sm:col-auto border-solid border-y-2">

            {step.isComplete &&
              <a href={step.href} onClick={step.onClick} className="group p-4 flex flex-col items-start border-l-4 sm:border-l-0 sm:border-t-4 border-blue-500 hover:border-blue-900">
                {/* ::Step number */}
                <span className="text-sm text-blue-500 font-semibold uppercase tracking-wide group-hover:text-blue-900">{`STEP ${index + 1}`}</span>
                {/* ::Step title */}
                <span className="text-base text-gray-700 font-semibold">{step.title}</span>
              </a>
            }

            {step.isActive && !step.isComplete &&
              <a className="group p-4 flex flex-col items-start border-l-4 sm:border-l-0 sm:border-t-4 border-blue-500">
                {/* ::Step number */}
                <span className="text-sm text-blue-500 font-semibold uppercase tracking-wide">{`STEP ${index + 1}`}</span>
                {/* ::Step title */}
                <span className="text-base text-gray-700 font-semibold">{step.title}</span>
              </a>
            }

            {!step.isActive && !step.isComplete  &&
              <a className="group p-4 flex flex-col items-start border-l-4 sm:border-l-0 sm:border-t-4 border-gray-300 hover:border-gray-500">
                {/* ::Step number */}
                <span className="text-sm text-gray-500 font-semibold uppercase tracking-wide group-hover:text-gray-600">{`STEP ${index + 1}`}</span>
                {/* ::Step title */}
                <span className="text-base text-gray-700 font-semibold">{step.title}</span>
              </a>
            }

          </div>
        ))
        }
      </ol>
    </nav>
  )
}
