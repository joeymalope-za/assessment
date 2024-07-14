"use client"
import React,{useState, useEffect} from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { getUsers } from "@/lib/data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import NavBar from "@/components/navBar"
import { CardContent, Card, CardDescription } from "@/components/ui/card"

export default function Home(): JSX.Element {
    const [users,setUsers] = useState<any>([])

    useEffect(()=>{
        if(users.length === 0){
            setUsers(getUsers());
        }
    },[])

    return (<main className="w-screen h-screen">
                <NavBar />
                <div className="w-[100%] min-h-[90vh] rounded-lg flex justify-center pt-16">
                    <Card className="md:p-8">
                        <CardDescription className="font-bold text-center">List of current Active users</CardDescription>
                        <CardContent className="flex justify-center p-0 pt-4">
                            <Table className='text-[10px] sm:text-base md:w-[50%] overflow-x-scroll'>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead className="md:w-[100px]">ID</TableHead>
                                    <TableHead className="md:w-[100px]">Name</TableHead>
                                    <TableHead className="md:w-[100px]">email</TableHead>
                                    <TableHead className="text-right">Phone</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                    (users.map((user:any) => <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="text-right">{user.phone}</TableCell>
                                    <TableCell className="text-right">
                                    <Button variant={'ghost'} className="mr-auto">
                                        <Link href={`/users/${user.id}`}>
                                        View
                                        </Link>
                                    </Button>
                                    </TableCell>
                                    </TableRow>)
                                    )
                                    }
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    {/* <Tabs defaultValue="user" className="">
                        <TabsList>
                            <TabsTrigger value="user">Users</TabsTrigger>
                            <TabsTrigger value="posts">Posts</TabsTrigger>
                        </TabsList>
                        <TabsContent value="user">

                        </TabsContent>
                        <TabsContent value="posts">
                            <Table>
                                <TableCaption>A list of your Posts</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead className="w-[100px]">Name</TableHead>
                                    <TableHead className="w-[100px]">Username</TableHead>
                                    <TableHead className="w-[100px]">email</TableHead>
                                    <TableHead className="text-right">Phone</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                    (users.map((user:any) => <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="text-right">{user.phone}</TableCell>
                                    </TableRow>)
                                    )
                                    }
                                </TableBody>
                            </Table>
                        </TabsContent>
                    </Tabs> */}
                </div>
            </main>) 
}