import NavBar from '@/components/ui/navBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Icons } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post } from '@/lib/types';
import Link from 'next/link';

import { GetServerSideProps, NextPage } from 'next';
import { User } from '@/lib/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
interface ProfileProps {
  initialUser: User | null;
  initialPosts: Post[];
}

const Profile: NextPage<ProfileProps> = ({ initialUser, initialPosts }) => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  
  const [user, setUser] = useState<User | null>(initialUser);
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    if (!id) return;
    
    const cachedUser = localStorage.getItem(`user-${id}`);
    const cachedPosts = localStorage.getItem(`posts-${id}`);
    
    if (cachedUser && cachedPosts) {
      setUser(JSON.parse(cachedUser));
      setPosts(JSON.parse(cachedPosts));
    } else {
      fetchUserAndPosts();
    }
  }, [id]);

  const fetchUserAndPosts = async () => {
    try {
      const [userRes, postsRes] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
          headers: {
            'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
          }
        }),
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`,{
          headers: {
            'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
          }
        })
      ]);
  
      if (!userRes.ok || !postsRes.ok) {
        return {
          notFound: true,
        };
      }
  
      const [userData, postsData] = await Promise.all([userRes.json(), postsRes.json()]);

      localStorage.setItem(`user-${id}`, JSON.stringify(userData));
      localStorage.setItem(`posts-${id}`, JSON.stringify(postsData));

      setUser(userData);
      setPosts(postsData);
    } catch (error) {
      console.error(error);
      return {
        props: {
          user: null,
          posts: []
        },
      };
    }
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
          <main className="w-screen h-screen flex flex-col gap-8">
            <NavBar />
            <Card className="max-w-[95vw] min-w-[95vw] overflow-x-auto box-border md:min-w-[60vw] md:max-w-[60vw] mx-auto">
              <CardContent>
                <div className="min-h-[90vh] rounded-lg flex gap-6 flex-col justify-center mx-auto pt-5">
                    <Button variant={'ghost'} className="mr-auto flex">
                        <Icons.chevronLeft />
                        <Link href={'/'}>
                             <span>Back</span>
                        </Link>
                    </Button>
                    <header className="flex justify-center flex-col items-center gap-5">
                     <h1 className="text-3xl md:text-8xl text-center">Hi! Welcome to </h1>
                     {user?<h2 className="text-4xl text-center my-4"><span className="text-[#6d6da5]">{user && user.name}</span>&apos;s profile</h2>:<Skeleton className="w-[35vw] h-[40px] rounded-full" /> }
                     </header>
                     <Tabs defaultValue="profile" className="min-h-[90vh]">
                         <TabsList className="flex mb-8">
                             <TabsTrigger value="profile" className="md:min-w-[300px]">Profile details</TabsTrigger>
                             <TabsTrigger value="posts" className="md:min-w-[300px]">View Posts</TabsTrigger>
                         </TabsList>
                         <TabsContent value="profile">
                            <div className="flex flex-col p-8 pl-0 items-center">
                                <div className="text-center flex gap-4 flex-col justify-between">
                                    <h1 className="text-3xl flex gap-8 align-middle justify-center items-center"><Icons.user className="h-16 w-16" /> {user && user.name}</h1>
                                    <p className="text-gray-500">
                                        More about {user && user.name}
                                    </p>
                                    {
                                    (user)?
                                    <>
                                        <h2 className="flex gap-8"><Icons.username/> @{user && user.username}</h2>
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
                                    <Card className="w-[375px] flex flex-col justify-between bg-[#e5f1ed] border-none">
                                        <CardHeader>
                                            <CardDescription className="flex gap-4 text-[#508773]"><Icons.work /> Work</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="font-[300] flex flex-col gap-2">
                                                <li>Work&apos;s at {(user)?<span className="font-[600]">{user?.company?.name}</span>:<Skeleton className="w-[150px] h-[15px] rounded-full" />}</li>
                                                <li>Catchphrase is {(user)?<span className="font-[600]">{user?.company?.catchPhrase}</span>:<Skeleton className="w-[150px] h-[15px] rounded-full" />}</li>
                                            </ul>
                                        </CardContent>
                                        <CardFooter>
                                         <span className="mr-4">{user?.company?.bs}</span> <Icons.qoute className="opacity-30 text-[#508773]"/>
                                        </CardFooter>
                                    </Card>
                                    <Card className="w-[375px] bg-[#e0e0fd] border-none flex flex-col justify-between">
                                        <CardHeader>
                                            <CardDescription className="flex gap-4 text-[#6d6da5]"><Icons.address /> Lives in</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex flex-wrap">
                                            {(user)?
                                            <ul>
                                            <li>{user?.address?.street}, </li>
                                            <li>{user?.address?.suite}, </li>
                                            <li>{user?.address?.city}, </li>
                                            <li>{user?.address?.zipcode} </li>
                                            </ul>:
                                            <div className="flex flex-col gap-4">
                                                <Skeleton className="w-[150px] h-[15px] rounded-full" />
                                                <Skeleton className="w-[150px] h-[15px] rounded-full" />
                                                <Skeleton className="w-[150px] h-[15px] rounded-full" />
                                                <Skeleton className="w-[150px] h-[15px] rounded-full" />
                                            </div>}
                                        </CardContent>
                                        <CardFooter>
                                           <Icons.location className="mr-4 text-[#6d6da5]" /> <p> {user?.address?.geo?.lat},{user?.address?.geo?.lat} </p>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </div>
                         </TabsContent>
                         <TabsContent className='overflow-hidden' value="posts">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="md:w-[100px]">ID</TableHead>
                                        <TableHead className="md:max-w-[150px]">Title</TableHead>
                                        <TableHead className="text-center">Body</TableHead>
                                    </TableRow>
                                </TableHeader>
                                {(posts)?(<TableBody>
                                    {
                                    (posts.map((post:any) => 
                                    <TableRow key={post.id}>
                                        <TableCell className="md:w-[100px] font-medium">{post.id}</TableCell>
                                        <TableCell className="md:w-[150px]">{post.title}</TableCell>
                                        <TableCell className="text-left">{post.body}</TableCell>
                                    </TableRow>)
                                    )
                                    }
                                </TableBody>):
                                <TableCaption>No posts are currently available</TableCaption>
                                }     
                            </Table>
                         </TabsContent>
                     </Tabs>
                </div>
              </CardContent>
            </Card>
          </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const [userRes, postsRes] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
        }
      }),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`,{
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
        }
      })
    ]);

    if (!userRes.ok || !postsRes.ok) {
      return {
        notFound: true,
      };
    }

    const [user, posts] = await Promise.all([userRes.json(), postsRes.json()]);

    return {
      props: {
        user,
        posts
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        user: null,
        posts: []
      },
    };
  }
};

export default Profile;
