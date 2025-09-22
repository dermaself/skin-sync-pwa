import { GradientSplash } from '@/components/GradientSplash';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to today page after a short delay to show splash
    const timer = setTimeout(() => {
      navigate('/today');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <GradientSplash />;
};

export default Index;
