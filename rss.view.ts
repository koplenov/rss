namespace $.$$ {

	export class $koplenov_rss extends $.$koplenov_rss {

		@$mol_mem
		proxy() {
			return "https://rss.kinsle.ru/proxy/"
		}

		@$mol_mem_key
		raw_xml_posts( url: string ) {
			return $mol_fetch.text( this.proxy() + url )
		}

		@$mol_mem_key
		posts( site: string ) {
			const data = new window.DOMParser().parseFromString( this.raw_xml_posts( site ), "text/xml" )
			const items = data.querySelectorAll( "item" )
			const posts: { title: string | undefined; link: string | undefined }[] = []
			items.forEach( item => posts.push( {
				title: item.querySelector( "title" )?.innerHTML,
				link: item.querySelector( "link" )?.innerHTML,
			} ) )
			return posts
		}

		@$mol_mem
		all_posts() {
			const posts = [
				...this.posts( "https://dmoth.site/posts/index.xml" ),
				...this.posts( "https://critter.blog/feed" ),
			]

			return posts.filter( post => post.title?.includes( this.query() ) )
		}

		posts_view() {
			return this.all_posts().map( post => this.Post( post ) )
		}

		post_title( id: any ) {
			return id.title
		}

		post_link( id: any ) {
			return id.link
		}
	}

}
