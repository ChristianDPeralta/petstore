package com.peralta.pet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {

    @Query("SELECT p FROM Pet p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :key, '%')) OR " +
            "LOWER(p.species) LIKE LOWER(CONCAT('%', :key, '%')) OR " +
            "LOWER(p.breed) LIKE LOWER(CONCAT('%', :key, '%'))")
    List<Pet> searchByKeyword(String key);

    List<Pet> findByPriceLessThanEqual(double price);
}