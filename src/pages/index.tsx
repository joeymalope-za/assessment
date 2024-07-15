// import "@/src/globals.css"
import NavBar from '@/components/ui/navBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Icons } from "@/components/ui/icons";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User } from '@/lib/types';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

interface DataProps {
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

const Page: NextPage<DataProps> = ({ users }) => {
  return (
    <main className="w-screen min-h-screen pb-8">
      <NavBar />
      <div className="w-[100%] min-h-[90vh] rounded-lg flex justify-center pt-16">
          <Card className="md:p-8">
              <CardDescription className="font-bold text-center flex items-center justify-center"><Icons.user className="mr-4" />List of current Active users</CardDescription>
              <CardContent className="flex justify-center p-0 pt-4">
                  <Table className='text-[10px] sm:text-[12px] overflow-x-scroll'>
                      <TableHeader>
                          <TableRow>
                          <TableHead className="md:w-[100px]">ID</TableHead>
                          <TableHead className="md:w-[100px]">Name</TableHead>
                          <TableHead className="md:w-[100px]">Email</TableHead>
                          <TableHead className="text-right">Phone</TableHead>
                          <TableHead className="text-right"></TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {
                          (users.map((user:any) => 
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="text-right">{user.phone}</TableCell>
                            <TableCell className="text-right">
                              <Button variant={'ghost'} className="mr-auto text-[#508773]">
                                  <Link className="text-[#508773]" href={`/profile/${user.id}`}>
                                  View profile
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
  );
};

export default Page;
