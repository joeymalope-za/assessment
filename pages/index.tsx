
// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
//     </main>
//   );
// }


import NavBar from '@/components/navBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Post, User } from '@/lib/types';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

interface DataProps {
  posts: Post[];
  users: User[];
}

export const getServerSideProps: GetServerSideProps<DataProps> = async () => {
  try {
    const [postsRes, usersRes] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts', {
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
        }
      }),
      fetch('https://jsonplaceholder.typicode.com/users', {
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
        }
      })
    ]);

    if (!postsRes.ok) {
      console.error('Error fetching posts:', postsRes.statusText);
      throw new Error(`Failed to fetch posts: ${postsRes.statusText}`);
    }

    if (!usersRes.ok) {
      console.error('Error fetching users:', usersRes.statusText);
      throw new Error(`Failed to fetch users: ${usersRes.statusText}`);
    }

    const [posts, users] = await Promise.all([postsRes.json(), usersRes.json()]);

    return {
      props: {
        posts,
        users,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        posts: [],
        users: [],
      },
    };
  }
}

const Page: NextPage<DataProps> = ({ posts, users }) => {
  return (<>
    {/* <div>
      <h1>Posts</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div> */}
    <main className="w-screen h-screen">
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
    </div>
    </main>
  </>
  );
};

export default Page;
