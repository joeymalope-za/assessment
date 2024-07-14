"use client"
import React,{useState, useEffect} from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPosts, getPostsByUserId, getUserById } from "@/lib/data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ghost } from "lucide-react"
import Link from "next/link"
import NavBar from "@/components/navBar"
import { Icons } from "@/components/ui/icons"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home(param: any): JSX.Element {
    const [user,setUser] = useState<any>(null)
    const [posts,setPosts] = useState<any>([])
    const [id,setId] = useState<any>('')

        useEffect(() => {
        if (id==='' && param?.params?.id) {
          setId(param.params.id)
        }

      }, [param?.params?.id, id])

      useEffect(()=>{
        if(id.length){
            setUser(getUserById(id))
            setPosts(getPostsByUserId(id));
        }
      },[id])

    useEffect(()=>{
        console.log(posts)    

        if(posts.length)
            console.log(posts)    
    },[posts])

    return (<main className="w-screen h-screen">
                <NavBar />
                <div className="max-w-[95vw] md:max-w-[60vw] min-h-[90vh] rounded-lg flex gap-6 flex-col justify-center mx-auto pt-5">
                    <Button variant={'ghost'} className="mr-auto flex">
                        <Icons.chevronLeft />
                        <Link href={'/users'}>
                             <span>Back</span>
                        </Link>
                    </Button>
                    <header className="flex justify-center flex-col items-center gap-5">
                     <h1 className="text-3xl md:text-8xl text-center">Hi! Welcome to </h1>
                     {user?<h2 className="text-4xl text-center my-4">{user && user.name}&apos;s profile</h2>:<Skeleton className="w-[35vw] h-[40px] rounded-full" /> }
                     </header>
                     <Tabs defaultValue="profile" className="h-[90vh]">
                         <TabsList className="flex mb-8">
                             <TabsTrigger value="profile" className="md:min-w-[400px]">Profile</TabsTrigger>
                             <TabsTrigger value="posts" className="md:min-w-[400px]">Posts</TabsTrigger>
                         </TabsList>
                         <TabsContent value="profile">
                            <div className="flex flex-col p-8 pl-0 items-center">
                                <div className="text-center flex gap-4 flex-col justify-between">
                                    <h1 className="text-3xl flex gap-8 align-middle justify-center items-center"><Icons.user className="h-16 w-16" /> {user && user.name}</h1>
                                    <p className="text-gray-500">
                                        Learn more about below
                                    </p>
                                    {
                                    (user)?
                                    <>
                                        <h2 className="flex gap-8"><Icons.username /> @{user && user.username}</h2>
                                        <h2 className="flex gap-8"><Icons.mail />
                                        {user && user.email}</h2>
                                        <h2 className="flex gap-8"><Icons.phone />{user && user.phone}</h2>
                                        <h2 className="flex gap-8"><Icons.globe /> www.{user && user.website}</h2>
                                    </>:
                                    <div className="flex flex-col gap-4">
                                        <Skeleton className="w-[35vw] h-[30px] rounded-full" />
                                        <Skeleton className="w-[35vw] h-[30px] rounded-full" />
                                        <Skeleton className="w-[35vw] h-[30px] rounded-full" />
                                        <Skeleton className="w-[35vw] h-[30px] rounded-full" />
                                    </div>
                                    }
                                </div>
                                <div className="flex flex-col md:flex-row gap-8 mt-8 justify-evenly">
                                    <Card className="w-auto min-w-[350px] flex flex-col justify-between">
                                        <CardHeader>
                                            {/* <CardTitle>Card Title</CardTitle> */}
                                            <CardDescription className="flex gap-4"><Icons.work /> Work</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="font-[300] flex flex-col gap-2">
                                                <li>Work&apos;s at {(user)?<span className="font-[600]">{user?.company?.name}</span>:<Skeleton className="w-[150px] h-[15px] rounded-full" />}</li>
                                                <li>Catchphrase is {(user)?<span className="font-[600]">{user?.company?.catchPhrase}</span>:<Skeleton className="w-[150px] h-[15px] rounded-full" />}</li>
                                            </ul>
                                        </CardContent>
                                        <CardFooter>
                                         <span className="mr-4">{user?.company?.bs}</span> <Icons.qoute className="opacity-30"/>
                                        </CardFooter>
                                    </Card>
                                    <Card className="w-auto min-w-[350px]">
                                        <CardHeader>
                                            {/* <CardTitle>Card Title</CardTitle> */}
                                            <CardDescription className="flex gap-4"><Icons.address /> Lives in</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            {(user)?
                                            <>
                                            <p>{user?.address?.street}, </p>
                                            <p>{user?.address?.suite}, </p>
                                            <p>{user?.address?.city}, </p>
                                            <p>{user?.address?.zipcode} </p>
                                            </>:
                                            <div className="flex flex-col gap-4">
                                                <Skeleton className="w-[150px] h-[15px] rounded-full" />
                                                <Skeleton className="w-[150px] h-[15px] rounded-full" />
                                                <Skeleton className="w-[150px] h-[15px] rounded-full" />
                                                <Skeleton className="w-[150px] h-[15px] rounded-full" />
                                            </div>}

                                        </CardContent>
                                        <CardFooter>
                                           <Icons.location className="text-muted-foreground mr-4" /> <p> {user?.address?.geo?.lat},{user?.address?.geo?.lat} </p>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </div>
                         </TabsContent>
                         <TabsContent value="posts">
                            <Table>
                                <TableCaption>A list of your Users</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="md:w-[100px]">ID</TableHead>
                                        <TableHead className="md:max-w-[200px]">Title</TableHead>
                                        <TableHead className="text-center w-[50vw]">Body</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                    (posts.map((user:any) => 
                                    <TableRow key={user.id}>
                                        <TableCell className="md:w-[100px] font-medium">{user.id}</TableCell>
                                        <TableCell className="md:w-[200px]">{user.title}</TableCell>
                                        <TableCell className="text-right">{user.body}</TableCell>
                                    </TableRow>)
                                    )
                                    }
                                </TableBody>
                            </Table>
                         </TabsContent>
                         </Tabs>
                </div>
            </main>) 
}