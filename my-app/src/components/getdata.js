const { useEffect, useState } = require("react");

const userAuthentication = async() => {
    try{
        const [token,setToken] = useState(localStorage.getItem("authtoken")) ;
        const [user,setUser] = useState("");
        const response = await fetch("http://localhost:5000/getdata",{
            method : GET ,
            headers : {
                Authorization : `Bearer ${token}` 
            },
        });
        if(response.ok){
            const data = await response.json();
            console.log("user data ",data);
            setUser(data);
        }
    }
    catch(e){
        console.log(e); 

    }
}
useEffect(() => {
    userAuthentication()
},[]) 