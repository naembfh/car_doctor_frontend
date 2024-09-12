
export interface Service {
    _id: string;
    id:number;
    img: string;
    name: string;
    description: string;
    price: number;
    duration: number; 
    isDeleted: boolean;
    createdAt: string; 
    updatedAt: string; 
    slug: string;
  }
  
 
  export interface ServicesResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Service[]; 
  }
  