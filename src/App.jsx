import { TextField, Button, Stack, FormControlLabel, RadioGroup, Radio, FormLabel, MenuItem } from '@mui/material';
import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [course, setCourse] = useState('');

  const [errors, setErrors] = useState({
    name: false,
    address: false,
    mobile: false,
    email: false,
    gender: false,
    dob: false,
    course: false
  });

  const validateInputs = (inputTag) => {
    const { name, value } = inputTag;
  
    switch (name) {
      case 'name':
        setName(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          // Ensures the name has at least 3 characters and contains no numbers
          name: /[0-9]/.test(value)
        }));
        break;
      case 'address':
        setAddress(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: value.length < 10
        }));
        break;
      case 'mobile':
        setMobile(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobile: !/^\d{10}$/.test(value)
        }));
        break;
      case 'email':
        setEmail(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: !/\S+@\S+\.\S+/.test(value)
        }));
        break;
      case 'gender':
        setGender(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          gender: !value
        }));
        break;
      case 'dob':
        setDob(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          dob: !value
        }));
        break;
      case 'course':
        setCourse(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          course: !value
        }));
        break;
      default:
        break;
    }
  };
  

  const handleRegister = (e) => {
    e.preventDefault();
  
    // Check if any fields are empty
    if (!name || !address || !mobile || !email || !gender || !dob || !course) {
      alert("Please fill in all the fields.");
      return;
    }
  
    // Validate the input
    const isValid = Object.values(errors).every((error) => error === false);
  
    if (isValid) {
      alert(`Data stored successfully!\nName: ${name}\nAddress: ${address}\nMobile: ${mobile}\nEmail: ${email}\nGender: ${gender}\nDOB: ${dob}\nCourse: ${course}`);
    } else {
      alert("Please correct the errors in the form.");
    }
  };
  

  const handleReset = () => {
    setName('');
    setAddress('');
    setMobile('');
    setEmail('');
    setGender('');
    setDob('');
    setCourse('');
    setErrors({
      name: false,
      address: false,
      mobile: false,
      email: false,
      gender: false,
      dob: false,
      course: false
    });
  };

  return (
    <div style={{ width: '100%', height: '100vh',fontFamily:'revert-layer' }} className='d-flex justify-content-center align-items-center bg-dark'>
      <div style={{ width: '600px' }} className='bg-light rounded px-5 py-1'>
        <h3>Higher Secondary Admission Form</h3>
        <form className='mt-3'>
          {/* Name */}
          <div className='mb-3'>
            <TextField
              value={name}
              name="name"
              onChange={(e) => validateInputs(e.target)}
              className='w-100'
              label="Name"
              variant="outlined"
              error={errors.name}
              helperText={errors.name ? "Name must contain no numbers" : ""}
            />
          </div>


          {/* Address */}
          <div className='mb-3'>
            <TextField
              value={address}
              name="address"
              onChange={(e) => validateInputs(e.target)}
              className='w-100'
              label="Address"
              multiline
              rows={3}
              variant="outlined"
              error={errors.address}
              helperText={errors.address ? "Address must be at least 10 characters long" : ""}
            />
          </div>

          {/* Mobile */}
          <div className='mb-3'>
            <TextField
              value={mobile}
              name="mobile"
              onChange={(e) => validateInputs(e.target)}
              className='w-100'
              label="Mobile Number"
              variant="outlined"
              error={errors.mobile}
              helperText={errors.mobile ? "Invalid mobile number" : ""}
            />
          </div>

          {/* Email */}
          <div className='mb-3'>
            <TextField
              value={email}
              name="email"
              onChange={(e) => validateInputs(e.target)}
              className='w-100'
              label="Email"
              variant="outlined"
              error={errors.email}
              helperText={errors.email ? "Invalid email address" : ""}
            />
          </div>

          {/* Gender */}
          <div className='mb-3'>
            <FormLabel>Gender</FormLabel>
            <RadioGroup row name="gender" value={gender} onChange={(e) => validateInputs(e.target)}>
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
            {errors.gender && <p className="text-danger">Please select a gender</p>}
          </div>

          {/* Date of Birth */}
          <div className='mb-3'>
            <TextField
              type="date"
              value={dob}
              name="dob"
              onChange={(e) => validateInputs(e.target)}
              className='w-100'
              label="Date of Birth"
              slotProps={{ inputLabel: { shrink: true } }} // updated to slotProps
              error={errors.dob}
              helperText={errors.dob ? "Please select a valid date" : ""}
            />
          </div>

          {/* Course */}
          <div className='mb-3'>
            <TextField
              select
              value={course}
              name="course"
              onChange={(e) => validateInputs(e.target)}
              className='w-100'
              label="Select Course"
              variant="outlined"
              error={errors.course}
              helperText={errors.course ? "Please select a course" : ""}
            >
              <MenuItem value="Biology">Biology</MenuItem>
              <MenuItem value="Computer Science">Computer Science</MenuItem>
              <MenuItem value="Commerce">Commerce</MenuItem>
              <MenuItem value="Humanities">Humanities</MenuItem>
            </TextField>
          </div>

          {/* Buttons */}
          <Stack direction="row" spacing={2}>
            <Button onClick={handleRegister} variant="contained" style={{ width: '50%' }}>Register</Button>
            <Button onClick={handleReset} variant="outlined" style={{ width: '50%' }}>Reset</Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export default App;
