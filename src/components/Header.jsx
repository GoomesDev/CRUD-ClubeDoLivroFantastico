import { IconButton , AppBar , Stack , styled } from '@mui/material'
import Banner from './assets/banner.png'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'

// Cabeçalho personalizado
const CustomHeader = styled(AppBar) ({
  background: '#e5e0ff', 
  margin: '0', 
  padding: '10px'
})


function Header() {
  return (
    <CustomHeader elevation={1} position='static'>
          
          {/*Stack onde ficará organizado os items do Custom Header*/}
          <Stack direction={'row'} justifyContent={'space-between'}>
            
                <img src={Banner} width={'85px'} alt='Clube do Livro'/>
            
            <Stack alignItems={'center'} direction='row' spacing={1}>
                <IconButton><HomeIcon fontSize='medium' color='primary'/></IconButton>
                <IconButton><AccountCircleIcon fontSize='medium' color='primary'/></IconButton>
                <IconButton><LogoutIcon fontSize='medium' color='primary'/></IconButton>  
            </Stack>
          </Stack>

    </CustomHeader>
  )
}

export default Header