interface sb_type {
    label : string 
  }
  export function SubHeading({label}: sb_type) {
      return <div className="text-slate-500 text-md pt-1 px-4 pb-4">
        {label}
      </div>
    }