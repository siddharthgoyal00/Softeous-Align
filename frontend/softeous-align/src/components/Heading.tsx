interface H_type{
    label : string 
  }
  export function Heading({label}: H_type) {
      return <div className="font-bold text-3xl pt-6">
        {label}
      </div>
  }