import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HabitsEmpty() {
  const { navigate } = useNavigation();

  return (
    <Text className="text-base text-zinc-400">
      You have no habits yet{' '}
      <Text
        className="text-base text-violet-400 underline active:text-violet-500"
        onPress={() => navigate('new')}
      >
        Add a new habit.
      </Text>
    </Text>
  );
}
