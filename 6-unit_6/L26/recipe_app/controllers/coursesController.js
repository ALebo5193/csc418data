const Course = require( '../models/course' );

module.exports = {
  index: ( req, res, next ) => {
    Course.find()
      .then( courses => {
        res.locals.courses = courses;
        next();
      } )
      .catch( error => {
        console.log( `Error fetching courses: ${error.message}` );
        next( error );
      } );
  },
  indexView: ( req, res ) => {
    if(req.query.format === "json"){
      res.json(res.locals.courses);
    }
    else{
      res.render('courses/index');
    }
  },

  new: ( req, res ) => {
    res.render( 'courses/new' );
  },

  create: ( req, res, next ) => {
    let courseParams = {
      title: req.body.title,
      description: req.body.description,
      items: [ req.body.items.split( ',' ) ],
      zipCode: req.body.zipCode
    };
    Course.create( courseParams )
      .then( course => {
        res.locals.redirect = '/courses';
        res.locals.course = course;
        next();
      } )
      .catch( error => {
        console.log( `Error saving course: ${error.message}` );
        next( error );
      } );
  },

  show: ( req, res, next ) => {
    let courseId = req.params.id;
    Course.findById( courseId )
      .then( course => {
        res.locals.course = course;
        next();
      } )
      .catch( error => {
        console.log( `Error fetching course by ID: ${error.message}` );
        next( error );
      } );
  },

  showView: ( req, res ) => {
    res.render( 'courses/show' );
  },

  edit: ( req, res, next ) => {
    let courseId = req.params.id;
    Course.findById( courseId )
      .then( course => {
        res.render( 'courses/edit', {
          course: course
        } );
      } )
      .catch( error => {
        console.log( `Error fetching course by ID: ${error.message}` );
        next( error );
      } );
  },

  update: ( req, res, next ) => {
    let courseId = req.params.id,
      courseParams = {
        title: req.body.title,
        description: req.body.description,
        items: [ req.body.items.split( ',' ) ],
        zipCode: req.body.zipCode
      };

    Course.findByIdAndUpdate( courseId, {
        $set: courseParams
      } )
      .then( course => {
        res.locals.redirect = `/courses/${courseId}`;
        res.locals.course = course;
        next();
      } )
      .catch( error => {
        console.log( `Error updating course by ID: ${error.message}` );
        next( error );
      } );
  },

  delete: ( req, res, next ) => {
    let courseId = req.params.id;
    Course.findByIdAndRemove( courseId )
      .then( () => {
        res.locals.redirect = '/courses';
        next();
      } )
      .catch( error => {
        console.log( `Error deleting course by ID: ${error.message}` );
        next();
      } );
  },

  redirectView: ( req, res, next ) => {
    let redirectPath = res.locals.redirect;
    if ( redirectPath !== undefined ) res.redirect( redirectPath );
    else next();
  }
};
