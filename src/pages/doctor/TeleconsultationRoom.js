import { Container, Button } from 'react-bootstrap';
import { FaVideo, FaMicrophone, FaPhoneSlash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const TeleconsultationRoom = () => {
  const { id } = useParams();

  return (
    <Container className="mt-5 text-center">
      <h2 className="mb-4">Live Consultation</h2>
      <p>Appointment ID: {id}</p>
      <div className="bg-dark p-4 rounded" style={{ height: '500px' }}>
        <h4 className="text-white-50">Video Call in Progress...</h4>
        <div className="d-flex justify-content-center align-items-center h-100">
          <img src="https://via.placeholder.com/640x360.png?text=Patient+Video+Feed" alt="Patient Video Feed" className="img-fluid rounded me-2" />
          <img src="https://via.placeholder.com/200x150.png?text=Your+Video+Feed" alt="Your Video Feed" className="img-fluid rounded border border-white" style={{ position: 'absolute', bottom: '20px', right: '20px' }} />
        </div>
      </div>
      <div className="mt-4">
        <Button variant="outline-light" className="m-2"><FaMicrophone /> Mute</Button>
        <Button variant="outline-light" className="m-2"><FaVideo /> Off</Button>
        <Button variant="danger" className="m-2"><FaPhoneSlash /> End Call</Button>
      </div>
    </Container>
  );
};

export default TeleconsultationRoom;