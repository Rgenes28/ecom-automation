
/*export const userData = {
    name: '1323466',
    lastname :'6562323',
    email: 'd232qsqq@gmiii',
    password: '8jh22u3232hjkjn16'

}*/
import {faker} from '@faker-js/faker';

export const userData = {
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
};

