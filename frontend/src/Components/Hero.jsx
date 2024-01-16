import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';



const Hero = () => {
    return (
      <div className=' py-5'>
        <Container className='d-flex justify-content-center'>
          <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
            <h1 className='text-center mb-4'>WELCOME TO MERN APP</h1>
            <p className='text-center mb-4' style={{color:"red"}}>
            M-MONGODB
            E-EXPRESS
            R-REACT
            N-NODEJS
            </p>
            <div className='d-flex'>

          </div>
          </Card>
        </Container>
      </div>
    );
  };
  
  export default Hero;

