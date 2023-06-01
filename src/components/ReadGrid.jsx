import { DataGrid } from '@mui/x-data-grid'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import ReplayIcon from '@mui/icons-material/Replay';
import { Badge , Typography , InputLabel , Select , MenuItem , Rating , Button , IconButton , Switch , TextField, Stack, styled, Box , Modal } from '@mui/material'
import React, {useState } from 'react'
import AnnouncementRoundedIcon from '@mui/icons-material/AnnouncementRounded'
import AddBoxIcon from '@mui/icons-material/AddBox'

// Estilização do container principal/corpo do CRUD
const Container = styled(Stack) ({
    boxShadow: '1px 2px 4px 0px gray', 
    width: '98%;',
    alignSelf: 'center',
    direction: 'column',
    display: 'flex',
  })

const CustomInput = styled(TextField) ({
    width: '100%',
})

//Container principal/corpo do CRUD
function ReadGrid() {

// Columns
const columns = [
    {
        field: 'id', 
        headerName: 'ID',
        width: '50',
        align: 'center',
        headerAlign: 'center',
        disableColumnMenu: true,
        disableClickEventBubbling: true,
    },

    {
        field: 'book',
        headerName: 'Livro',
        width: '380',
        align: 'left',
        disableColumnMenu: true,
    },

    {
        field: 'author',
        headerName: 'Autor',
        width: '200',
        align: 'left',
        disableColumnMenu: true,
    },

    {
        field: 'genre',
        headerName: 'Gênero',
        width: '170',
        align: 'left',
        disableColumnMenu: true,
    },

    {
        field: 'rating',
        headerName: 'Avaliação',
        renderCell: (params) => (
            <Rating name='rating' size='small' precision={0.5} readOnly value={params.value}/>
        ),
        width: '110',
        align: 'center',
        headerAlign: 'center',
        disableColumnMenu: true,
    },

    {
        field: 'rereading',
        headerName: 'Releitura',
        renderCell: (params) => (
            <Switch name='rereading' size='small' disabled checked={params.value}/>
        ),
        width: '100',
        align: 'center',
        headerAlign: 'center',
        disableColumnMenu: true,
    },

    {
        field: 'pages',
        headerName: 'Pgns',
        type: 'number',
        width: '100',
        align: 'center',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        disableColumnMenu: true,
    },

    {
        field: 'edit',
        headerName: 'Editar',
        renderCell: (params) => (
            <IconButton 
            variant='contained' 
            color='info' 
            size='small' 
            onClick={() => handleEditRow(params.row)}>
                <BorderColorIcon/>
            </IconButton>
        ),
        width: '100',
        align: 'center',
        headerAlign: 'center',
        disableColumnMenu: true,
        sortable: false,
        filterable: false,
    },

    {
        field: 'repost',
        headerName: 'Repost',
        renderCell: (params) => (
            <IconButton variant='contained' color='info' size='small' onClick={() => handleRepost(params.row)}>
            {params.row.reposted ? <ReplayIcon style={{ color: 'green' }} /> : <ReplayIcon />}
            </IconButton>
        ),
        width: '100',
        align: 'center',
        headerAlign: 'center',
        disableColumnMenu: true,
        sortable: false,
        filterable: false,
    },
]

// Rows
const [rows, setRows] = useState([
    { id: 1, book: 'O Hobbit', author: 'Tolkien', genre: 'Fantasia', pages: '460', rating: 4.5, rereading: true, repost: false},
    { id: 2, book: 'O Senhor dos Anéis', author: 'Tolkien', genre: 'Fantasia', pages: '1280', rating: 5, rereading: false, repost: false }
])

    // Criação do Row + Condições
    const handleFormSubmit = () => {
        
        const intValue = parseInt(formData.pages, 10)
        if (isNaN(intValue)) {
          return
        }

        const newRow = {
          id: rows.length + 1,
          book: formData.book,
          author: formData.author,
          genre: formData.genre,
          pages: intValue,
          rating: ratingValue,
          rereading: formData.rereading,
        }
      
        setRows((prevRows) => [...prevRows, newRow])
        handleClose()
    }

  // useStates
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const [ratingValue, setRatingValue] = useState(0)
  const [switchValue, setSwitchValue] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [searchBook, setSearchBook] = useState('')

  // Função para abrir e fechar Modal
  const handleOpen = () => {
    setOpen(true)
    setEditMode(false)
  }

  const handleClose = () => {
    setFormData({})
    setRatingValue(0)
    setSwitchValue(false)
    setOpen(false)
  }


  // Função para setar um novo Value
  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }))
    
    const { name, value, checked } = e.target
    if (name === 'rating') {
        setRatingValue(Number(value))
    } else if (name === 'rereading') {
        setSwitchValue(checked)
    } else {
        setSwitchValue((prevSwitchValue) => ({
        ...prevSwitchValue,
        [name]: value,
        }))
    }
  }

// Função para editar uma linha
const handleEditRow = (row) => {
    setFormData(row)
    setRatingValue(row.rating)
    setSwitchValue(true)
    setOpen(true)
    setEditMode(true)
  }
  
  // Função para atualizar uma linha
  const handleUpdateRow = () => {
    const updatedRow = {
      ...formData,
      rating: ratingValue,
      rereading: formData.rereading,
    }
  
    const updatedRows = rows.map((row) => {
      if (row.id === updatedRow.id) {
        return updatedRow
      }
      return row
    })
    setRows(updatedRows)
    handleClose()
  }

  // Função Respost
  const handleRepost = (row) => {
    const lastId = rows.length > 0 ? rows[rows.length - 1].id : 0
    const newId = lastId + 1
    const updatedRow = { ...row,id: newId, reposted: true }
    const updatedRows = [...rows, updatedRow]
    setRows(updatedRows)
  }

  return (
    <Container margin={1} padding={1}>
        
        {/*Input de pesquisa e botão Create*/}
        <Stack margin={1} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            
            <TextField 
            placeholder='Procure por livro ou autor'
            variant='standard' 
            size='small'
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
            />
            
            <Stack direction={'row-reverse'} spacing={2}>
                <IconButton 
                onClick={handleOpen}
                >
                    <AddBoxIcon color='primary' fontSize='large'/>
                </IconButton>

                <Stack justifyContent={'center'} alignItems={'center'}>
                    <Badge
                    badgeContent={rows.length}
                    color='error'
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                        <AnnouncementRoundedIcon fontSize='medium' color='primary'/>
                    </Badge>
                 </Stack>
            </Stack>

        </Stack>

        {/*Corpo do sistema*/}
        <DataGrid
            rows={rows.filter((row) => 
            row.book.toLowerCase().includes(searchBook.toLowerCase()) ||
            row.author.toLowerCase().includes(searchBook.toLowerCase())
            )}
            columns={columns}
            disableRowSelectionOnClick
        />

        <Modal open={open} onClose={handleClose}>
            <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'background.paper', boxShadow: 24, p: 4}}>
                <Typography variant='h5' margin={1}>Cadastrar nova leitura</Typography>
                <Stack spacing={2}>
                    <CustomInput
                    id='outlined-required'
                    placeholder='Nome do Livro'
                    name='book'
                    onChange={handleInputChange}
                    value={formData.book || ''}
                    />

                    <CustomInput
                    required
                    id='outlined-required'
                    placeholder='Nome do Autor'
                    name='author'
                    onChange={handleInputChange}
                    value={formData.author || ''}
                    />
                    
                    <TextField
                    required
                    type='number'
                    id='outlined-required'
                    placeholder='Número de Pgs'
                    name='pages'
                    onChange={handleInputChange}
                    value={formData.pages}
                    />

                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Stack alignItems={'center'}>
                            <InputLabel>Avaliação</InputLabel>
                            <Rating 
                            name='rating' 
                            precision={0.5}
                            value={ratingValue}
                            onChange={(event, value) => setRatingValue(value)}
                            size='big'
                            />
                        </Stack>

                        <Stack alignItems={'center'}>
                            <InputLabel>Releitura?</InputLabel>
                            <Switch 
                            name='rereading'
                            size='small' 
                            checked={switchValue.rereading}
                            onChange={handleInputChange}
                            />
                        </Stack>

                        <Stack alignItems={'center'}>
                            <InputLabel>Escolha o Gênero</InputLabel>
                            <Select
                            label='Gênero'
                            name='genre'
                            value={formData.genre || 'Gênero'}
                            onChange={handleInputChange}
                            variant='standard'
                            size='small'
                            displayEmpty
                            >
                            <MenuItem value='Fantasia'>Fantasia</MenuItem>
                            <MenuItem value='Suspense'>Suspense</MenuItem>
                            <MenuItem value='Ficção Científica'>Ficção Científica</MenuItem>
                            </Select>
                        </Stack>
                    </Stack>

                    <Stack direction={'row'} spacing={2}>
                        <Button variant='contained' color='primary' onClick={editMode ? handleUpdateRow : handleFormSubmit}>{editMode ? 'Atualizar' : 'Adicionar'}</Button>
                        <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>        
    </Container>
    
  )
}

export default ReadGrid