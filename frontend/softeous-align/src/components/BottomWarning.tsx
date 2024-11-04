import { Link } from "react-router-dom"
interface BW {
  label : string ,
  buttonText : string , 
  to : string 
}
export function BottomWarning({label, buttonText, to}:BW) {
    return <div className="py-2 text-base flex justify-center">
      <div>
        {label}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer " to={to}>
        {buttonText}
      </Link>
    </div>
}