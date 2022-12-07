import {PrismaClient} from '@prisma/client'
import {faker} from '@faker-js/faker'
const prisma = new PrismaClient()

async function main() {


    const userDelete = await prisma.user.deleteMany()

    const user = await prisma.user.upsert({
        where: {
            userName: '4c656f'
        },
        update: {
            likes: {
                updateMany: {
                    where: {

                    },
                    data: {

                    }
                }
            },
            posts: {
                updateMany: {
                    where: {

                    },
                    data: {
                        content: `<p>newPostContent</p>`,
                    }
                }
            }
        },
        create: {
            userName: '4c656f',
            email: 'contact@4c656f.com',
            password: faker.internet.password(10),
            posts: {
                create:{
                    title: 'someTitle',
                    link: 'some-title',
                    content: `<p>${faker.lorem.paragraph(10)}</p>`,
                    comments: {
                        create: {
                            author:{
                                connect: {
                                    userName: '4c656f'
                                }
                            },
                            content: faker.lorem.sentence(20)
                        }
                    },
                    likes: {
                        create:{
                            author: {
                                connect: {
                                    userName: '4c656f'
                                }
                            }
                        }
                    }
                }
            }



        }
    })






    console.log(user)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit()
    })