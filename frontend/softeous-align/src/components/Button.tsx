interface B_type{
    label: any ,
    onClick : any
    }
    export function Button(this: any, {label, onClick}: B_type) {
        return <button onClick={onClick.bind(this,"12"
        )} type="button" className="w-full text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 text-lg">{label}</button>
    }