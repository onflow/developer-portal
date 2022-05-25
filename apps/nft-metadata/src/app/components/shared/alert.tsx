export function Alert({status, title, body}: {status: string, title: any, body: any}) {
  const classText = status === 'success' ?
    'bg-green-100 border-green-500 text-green-900'
    :
    'bg-red-100 border-red-500 text-red-900'
  const svgClassColor = status === 'success' ? 'text-green-500' : 'text-red-500'

  return (
    <div className={`${classText} border-t-4 rounded-b px-4 pt-4 shadow-md text-xs`} role="alert">
      <div className="flex">
        <div className="py-4"><svg className={`fill-current h-6 w-6 ${svgClassColor} mr-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg></div>
        <div>
          <p className="font-bold">{title}</p>
          <p>{body}</p>
        </div>
      </div>
    </div>
  )
}
