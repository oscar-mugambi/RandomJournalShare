import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Header } from './header';
import { BackButton } from './back-button';
type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonPath: string;
};

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonPath,
}: CardWrapperProps) => {
  return (
    <Card className='w-[400px] shadow-md'>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} path={backButtonPath} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
