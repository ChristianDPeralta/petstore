package com.peralta.pet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/peralta/pets")
@CrossOrigin(origins = "http://localhost:5173")
public class PetController {

    @Autowired
    private PetRepository petRepository;

    @GetMapping
    public ResponseEntity<List<Pet>> getAllPets() {
        return ResponseEntity.ok(petRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Pet> addPet(@RequestBody Pet pet) {
        return ResponseEntity.ok(petRepository.save(pet));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Pet>> addPetsBulk(@RequestBody List<Pet> pets) {
        return ResponseEntity.ok(petRepository.saveAll(pets));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        return petRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updatePet(@PathVariable Long id, @RequestBody Pet updatedPet) {
        return petRepository.findById(id).map(pet -> {
            pet.setName(updatedPet.getName());
            pet.setSpecies(updatedPet.getSpecies()); // Changed from type to species
            pet.setBreed(updatedPet.getBreed());
            pet.setAge(updatedPet.getAge());
            pet.setGender(updatedPet.getGender());
            pet.setPrice(updatedPet.getPrice());
            pet.setDescription(updatedPet.getDescription());
            pet.setImageUrl(updatedPet.getImageUrl());
            pet.setImageAlt(updatedPet.getImageAlt());
            pet.setAvailable(updatedPet.isAvailable());
            pet.setDateAdded(updatedPet.getDateAdded());
            petRepository.save(pet);
            return ResponseEntity.ok("Pet updated.");
        }).orElse(ResponseEntity.status(404).body("Pet not found."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePet(@PathVariable Long id) {
        if (petRepository.existsById(id)) {
            petRepository.deleteById(id);
            return ResponseEntity.ok("Pet deleted.");
        } else {
            return ResponseEntity.status(404).body("Pet not found.");
        }
    }

    @GetMapping("/search/{key}")
    public ResponseEntity<List<Pet>> searchByKeyword(@PathVariable String key) {
        return ResponseEntity.ok(petRepository.searchByKeyword(key));
    }

    @GetMapping("/search/price/{price}")
    public ResponseEntity<List<Pet>> searchByPrice(@PathVariable double price) {
        return ResponseEntity.ok(petRepository.findByPriceLessThanEqual(price));
    }
}