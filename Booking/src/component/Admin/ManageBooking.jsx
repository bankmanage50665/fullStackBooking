

export default function GetAllBooking(){

}


export async function loader() {
    try{
        const response = await fetch(`http://localhost:80/bookings`)
        const resData = await response.json()

        if(!response.ok){
            throw new Error(resData.message)
        }

        return resData

    }catch(err){
        throw JSON
    }
}