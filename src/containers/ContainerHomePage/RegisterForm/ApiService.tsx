import {RegisterUserData} from "./FieldTypesOfRegisterForm";
  
  const ApiService = {  
    registerUser: async (data: RegisterUserData): Promise<any> => {  
      const response = await fetch('https://api-int-gateway.trive.com/api/gateway/registration/v1/Registration/singleregister', {  
        method: 'POST',  
        headers: {  
          'Content-Type': 'application/json',  
        },  
        body: JSON.stringify(data),   
      });  
      if (!response.ok) {  
        throw new Error('Network response was not ok');  
      }  
      return response.json();  
    },  
  };  
  
  export default ApiService;