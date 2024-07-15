import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import NavBar from '@/components/ui/navBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User } from '@/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface DataProps {
  initialUsers: User[];
}

export const getServerSideProps: GetServerSideProps<DataProps> = async () => {
  try {
    const usersRes = await fetch('https://jsonplaceholder.typicode.com/users', {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
      }
    });

    if (!usersRes.ok) {
      console.error(usersRes);
      throw new Error(`Error fetching users: ${usersRes.statusText}`);
    }

    const users: User[] = await usersRes.json();

    return {
      props: {
        initialUsers: users,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        initialUsers: [],
      },
    };
  }
}

const Page: NextPage<DataProps> = ({ initialUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const router = useRouter();

  useEffect(() => {
    const cachedUsers = localStorage.getItem('users');
    if (cachedUsers) {
      setUsers(JSON.parse(cachedUsers));
    } else {
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
  }, [initialUsers]);

  return (
    <main className="w-screen min-h-screen pb-8 flex flex-col gap-8">
      <NavBar />
      <div className="w-[100%] min-h-[80vh] rounded-lg flex justify-center">
        <Card className="md:p-8 mx-auto md:min-w-[50vw]">
          <CardDescription className="font-bold text-center flex items-center justify-center mt-4">
            <Icons.user className="mr-4" />
            List of current Active users
          </CardDescription>
          <CardContent className="flex justify-center p-0 pt-4">
            <Table className="text-[10px] sm:text-[12px] overflow-x-scroll">
              <TableHeader>
                <TableRow>
                  <TableHead className="md:w-[100px]">ID</TableHead>
                  <TableHead className="md:w-[100px]">Name</TableHead>
                  <TableHead className="md:w-[100px]">Email</TableHead>
                  <TableHead className="text-right">Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user: User) => (
                  <TableRow className='cursor-pointer' key={user.id} onClick={()=> router.push(`/profile/${user.id}`)}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-right">{user.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Page;
