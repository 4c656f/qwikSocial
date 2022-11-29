import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.user.upsert({
        where: {userName: '4c656f'},
        update: {
            posts: {
                update:{
                    where:{
                        postLink: 'some-title'
                    },
                    data:{
                        postContent: '<h1>somePostContentTitle</h1>'
                    }
                }
            }
        },
        create: {
            userName: '4c656f',
            email: 'contact@4c656f.com',
            password: 'somePassword',
            posts:{
                create:{
                    title: 'someTitle',
                    postLink: 'some-title',
                    postContent: '<h1>somePostContentTitle</h1>'
                }
            }
        }
    })
    console.log(alice)
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