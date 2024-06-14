import { CARS_SEED } from './data/cars.seed';
import { Injectable } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
import { BRANDS_SEED } from './data/brands.seed';

@Injectable()
export class SeedService {

  private CARS_SEED;
  private BRANDS_SEED;
 
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,
  ){}


  populateDB(){

    this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.brandsService.fillBrandsWithSeedData(BRANDS_SEED);


    return 'Seed executed successfully'
  }

}
