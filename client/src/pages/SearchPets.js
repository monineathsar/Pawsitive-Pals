import React, { useState } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { searchPetfinder } from '../utils/API';
import { savePetIds, getSavedPetIds } from '../utils/localStorage';
import { ADD_PET } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const styles = {
  dropdownMenuStyle: {
    color: 'black',
  }
};

const animalTypes = [
  { label: 'Dog', value: 'dog' },
  { label: 'Cat', value: 'cat' },
  { label: 'Bird', value: 'bird' },
  { label: 'Horse', value: 'horse' },
  { label: 'Rabbit', value: 'rabbit' },
];

const SearchPets = ({updateShowModal}) => {
  // create state for holding returned google api data
  const [searchedPets, setSearchedPets] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold saved petId values
  const [petIds, setPetIds] = useState(getSavedPetIds());

  const [addPet] = useMutation(ADD_PET)
  // create method to search for pets and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }
    try {
      const response = await searchPetfinder(searchInput);
      const petData = response.animals.map((pet) => ({
        petId: pet.id,
        name: pet.name || ['No name to display'],
        type: pet.type,
        description: pet.description,
        image: pet.primary_photo_cropped?.full || '',
        link: pet.url,
        gender: pet.gender,
        breeds: pet.breeds.primary,
        mixed: pet.breeds.mixed,
        size: pet.size,
        status: pet.status,
        org_id: pet.organization_id,
        city: pet.contact.address.city,
        state: pet.contact.address.state,
        email: pet.contact.email,
        phone: pet.contact.phone,
        distance: pet.distance
      }));

      setSearchedPets(petData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // method to set state for searchInput
  const handleSelectChange = (selectedOption) => {
    setSearchInput(selectedOption);
  };

  const handleShowModal = (newState) => {
    updateShowModal(newState)
  }

  // create function to handle saving a pet to our database
  const handleSavePet = async (petId) => {
    // find the pet in `searchedPets` state by the matching id
    const petToSave = searchedPets.find((pet) => pet.petId === petId);
    // get token

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await addPet({
        variables: { ...petToSave },
      });
      // if pet successfully saves to user's account, save pet id to state
      setPetIds([...petIds, petToSave.petId]);
      savePetIds(petIds)
    } catch (err) {
      console.error(err);
    }
  };

  // routing
  const navigate = useNavigate();
  const navigateAnimal = (petId) => {
    navigate(`/animal/${petId}`);
  };

  return (
    <>
      <Jumbotron fluid className='text-light yellow-bg'>
        <Container>
          <h1>Search for Pets!</h1>
          <Form onSubmit={handleFormSubmit} style={styles.dropdownMenuStyle}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control as="select" onChange={(e) => handleSelectChange(e.target.value)}>
                  <option value="">Select an option</option>
                  {animalTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col xs={12} md={4} lg={4}>
                <Button type='submit' className='med-orange-bg' size='md'>
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2 className='dk-orange-txt'>
          {searchedPets.length
            ? `Viewing ${searchedPets.length} results:`
            : 'Search for an animal to view options of PAWSible Pals'}
        </h2>
        <CardColumns>
          {searchedPets.map((pet) => {
            return (
              <div key={pet.petId}>
                {/* <Routes>
                  <Route path="/animal" element={<AnimalPage />} />
                </Routes> */}
                <Card key={pet.petId} border='dark' className='dk-blue-text lt-cream-bg text-center'>
                  {pet.image ? (
                    <Card.Img onClick={() => navigateAnimal(pet.petId)} className='rounded-circle card-pics img-thumbnail mt-5' src={pet.image} alt={`The cover for ${pet.type}`} variant='top' />
                  ) : null}
                  <Card.Body onClick={() => navigateAnimal(pet.petId)} className='dk-blue-text'>
                    <Card.Title className='dk-blue-text'>{pet.name}</Card.Title>
                    <p className='small'>{pet.type}</p>
                    <Card.Text>{pet.description}</Card.Text>
                  </Card.Body>
                  {Auth.loggedIn() ? (
                    <Button
                      disabled={petIds?.some((petId) => petId === pet.petId)}
                      className='btn-block med-orange-bg'
                      onClick={() => handleSavePet(pet.petId)}
                    >
                      {petIds?.some((petId) => petId === pet.petId)
                        ? 'This pet has already been saved!'
                        : 'Save this Pet!'}
                    </Button>
                  ) : (
                    <Button className='btn-block med-red-bg' onClick={() => handleShowModal(true)}>
                      Sign up to meet a pal
                    </Button>
                  )}
                </Card>
              </div>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchPets;