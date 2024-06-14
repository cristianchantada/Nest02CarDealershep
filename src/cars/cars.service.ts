import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'corolla,'
    // },
    // {
    //   id: uuid(),
    //   brand: 'Volkswagen',
    //   model: 'golf',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Renault',
    //   model: 'Megane',
    // }
  ];

  findAll(){
    return this.cars;
  }

  finOneById(id: string){
    const car = this.cars.find(car => car.id === id);
    if ( !car ) throw new NotFoundException(`Car with id '${ id }' not found`);
    return car;
  }

  create(createCarDto: CreateCarDto){

    const car: Car = {
      id: uuid(),
      ...createCarDto
    }

    this.cars.push(car);
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto){

    let carDB = this.finOneById(id);

    if( updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Car id is not valid inside body`);

    this.cars = this.cars.map(car => {
      if(car.id === id) {
        carDB = {...carDB, ...updateCarDto, id}
        return carDB
      }
      return car;
    });

    return carDB
  }

  delete(id: string, ){
    const carDB = this.finOneById(id);
    this.cars = this.cars.filter( car => car.id !== id);
  }

  fillCarsWithSeedData(cars: Car[]){
    this.cars = cars;
  }

}
