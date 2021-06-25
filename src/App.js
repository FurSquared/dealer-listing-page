import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import Loop from '@material-ui/icons/Loop';

import ResponsiveEmbed from 'react-responsive-embed';
import Fuse from 'fuse.js';
import shuffle from 'knuth-shuffle-seeded';

import Album from './Album';
import TagSelect from './TagSelect';
import {data, dealersAlpha, dealersAlphaReverse, tags} from './loadData';


const fuseOptions = {
  threshold: 0.3,
  ignoreLocation: true,
  keys: ['display_name'],
};
const fuse = new Fuse(data, fuseOptions);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://draggor.me/">
        draggor.me
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  card: {
    height: '100%',
    maxHeight: '360px',
    maxWidth: '720px',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    height: '100%',
    maxHeight: '360px',
    maxWidth: '720px',
  },
}));

let randomDealers = data.slice();
shuffle(randomDealers);

const App = () => {
  const classes = useStyles();

  const [dealers, setDealers] = useState(randomDealers);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event) => {
    const str = event.target.value;
    setSearchText(str);

    if (str.length >= 3) {
      const searchResults = fuse.search(str);
      const dealerResults = searchResults.map(result => result.item);

      setDealers(dealerResults);
    } else {
      setDealers(randomDealers);
    }
  };

  const sortAlpha = () => {
    setDealers(dealersAlpha);
    setSearchText('');
  };
  const sortAlphaReverse = () => {
    setDealers(dealersAlphaReverse);
    setSearchText('');
  };
  const sortRandom = () => {
    randomDealers = data.slice();
    shuffle(randomDealers);
    setDealers(randomDealers);
    setSearchText('');
  };
  const filterTag = (tag) => {
    if (tag.length > 0) {
      const filteredDealers = dealersAlpha.slice().filter(dealer => dealer.tags.indexOf(tag) > -1);
      setDealers(filteredDealers);
    } else {
      setDealers(randomDealers);
    }
    setSearchText('');
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Anthrocon Online 2021 Dealers
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div style={{maxWidth: '720px', margin: '0 auto', paddingBottom: 16}}>
          <ResponsiveEmbed
            src="https://firr.cam/embed/video"
            title="Anthrocn Artist Alley"
            frameBorder="0"
            referrerPolicy="origin"
            scrolling="no"
            allowFullScreen>
          </ResponsiveEmbed>
        </div>
        <Grid container justify="center" maxwidth="xl">
          <Grid item>
            <TextField label="Search Dealers" value={searchText} onChange={handleSearch} />
          </Grid>
          <Grid item>
            <Box align="center" p={2}>
              <Button variant="contained" color="primary" onClick={sortAlpha}>A-Z</Button>
              <Button variant="contained" color="primary" onClick={sortAlphaReverse}>Z-A</Button>
              <Button variant="contained" color="primary" onClick={sortRandom}>
                <Loop />
              </Button>
            </Box>
          </Grid>
          <Grid item>
            <TagSelect tags={tags} onChange={filterTag} />
          </Grid>
        </Grid>
        <Album cards={dealers} />
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Anthrocon Online 2021 Dealers
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Created by Draggor
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </>
  );
};

export default App;
