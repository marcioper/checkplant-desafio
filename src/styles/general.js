import { StyleSheet } from 'react-native';
import { colors } from '~/styles';

const styles = StyleSheet.create({
  titleH2: {
    fontSize: 25,
    color: colors.white,
    fontWeight: '500',
    letterSpacing: 1,
  },
  titleH3: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '400',
    letterSpacing: 1,
  },
  textPWithoutBottom: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 20,
    fontWeight: '300',
  },
  textP: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 20,
    fontWeight: '300',
    marginBottom: 30,
  },
  linkWhite: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
    display: 'flex',
    position: 'relative',
    marginTop: 0,
    marginRight: 10,
    marginBottom: 0,
    marginLeft: 10,
  },

  textInput: {
    height: 50,
    fontSize: 16,
    color: colors.white,
    borderColor: colors.white,
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  textInputSecundary: {
    height: 25,
    fontSize: 15,
    fontWeight: '600',
    color: colors.secundary,
    flexWrap: 'wrap',
  },

  button: {
    height: 55,
    backgroundColor: colors.white,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: colors.secundary,
    fontWeight: '500',
    fontSize: 16,
  },
  buttonPrimary: {
    height: 55,
    backgroundColor: colors.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonPrimaryText: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 16,
  },

  errorContainer: {
    height: 55,
    backgroundColor: colors.danger,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 25,
    padding: 10,
  },
  errorText: {
    flex: 1,
    color: colors.white,
    fontWeight: '500',
    fontSize: 16,
  },

  successContainer: {
    height: 55,
    backgroundColor: colors.success,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 25,
    padding: 10,
  },
  successText: {
    flex: 1,
    color: colors.white,
    fontWeight: '500',
    fontSize: 16,
  },

  loadingContainer: {
    marginTop: 20,
    marginBottom: 20,
    height: 150,
  },
  loadingContainerSmall: {
    marginTop: 20,
    marginBottom: 20,
    height: 20,
  },
  loading: {
    color: colors.darkTransparent,
  },

  iconLeft: {
    fontSize: 36,
    color: colors.white,
    paddingLeft: 10,
  },
  iconRight: {
    fontSize: 24,
    color: colors.white,
  },

  iconMain: {
    width: 30,
    height: 30,
    color: colors.white,
    fontSize: 24,
  },
  iconMainContatos: {
    color: colors.white,
    fontSize: 24,
    paddingLeft: 2,
  },
  iconMainRede: {
    color: colors.white,
    fontSize: 24,
    paddingLeft: 2,
  },
  iconMenu: {
    width: 25,
    height: 30,
  },
  iconMenuCarteirinhas: {
    width: 25,
    height: 20,
  },
  iconMenuNoticias: {
    width: 25,
    height: 25,
  },
  iconMenuRede: {
    width: 25,
    height: 25,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },

  empty: {
    alignSelf: 'center',
    color: colors.danger,
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default styles;
