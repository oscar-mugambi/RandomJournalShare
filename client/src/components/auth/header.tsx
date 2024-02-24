type HeaderProps = {
  label: string;
};

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className='w-full flex flex-col gap-y-1 items-center justify-center'>
      <h1 className={'text-3xl font-semibold'}>Random Journal</h1>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  );
};
