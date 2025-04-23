
/*export const userData = {
    name: '1323466',
    lastname :'6562323',
    email: 'bbs@gmiii',
    password: 'ergn16',
   

}*/

import {faker} from '@faker-js/faker';

export const userData = {
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    country:'Colombia',
    town: faker.location.city(),
    address: faker.location.streetAddress(),
    notes:'sajoajsojaosjaosjaojsoajsojasjaojosnsdbsgds'

};

